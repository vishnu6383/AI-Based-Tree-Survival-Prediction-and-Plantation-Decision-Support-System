"""
Database Layer (MongoDB + Resilient Local Fallback)
===================================================
Provides asynchronous and synchronous methods to store and retrieve prediction history.
Connects to MongoDB if available; seamlessly falls back to a persistent local JSON store
so the application never crashes if MongoDB is not running locally.
"""

import os
import json
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from .config import settings

class DatabaseManager:
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.db = None
        self.collection = None
        self.is_connected: bool = False
        self.mode: str = "Uninitialized"
        self.fallback_file = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "data",
            "prediction_history_local.json"
        )
        os.makedirs(os.path.dirname(self.fallback_file), exist_ok=True)
        if not os.path.exists(self.fallback_file):
            with open(self.fallback_file, "w") as f:
                json.dump([], f)

    async def connect(self):
        try:
            self.client = AsyncIOMotorClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=2500
            )
            # Verify server connectivity
            await self.client.admin.command("ping")
            self.db = self.client[settings.DB_NAME]
            self.collection = self.db[settings.COLLECTION_NAME]
            # Create indexes
            await self.collection.create_index("timestamp")
            await self.collection.create_index("selected_species")
            self.is_connected = True
            self.mode = "MongoDB"
            print(f"[Database] Successfully connected to MongoDB at {settings.MONGODB_URI} (DB: {settings.DB_NAME})")
        except Exception as e:
            self.is_connected = False
            self.mode = "Local Storage Fallback (JSON)"
            print(f"[Database] MongoDB not reachable ({e}). Using persistent local fallback at {self.fallback_file}")

    async def close(self):
        if self.client:
            self.client.close()
            print("[Database] MongoDB client connection closed.")

    async def save_prediction(self, record: Dict[str, Any]) -> str:
        record_id = str(uuid.uuid4())
        timestamp_str = record.get("timestamp") or datetime.now().isoformat()

        doc = {
            "id": record_id,
            "timestamp": timestamp_str,
            "environmental_inputs": record.get("environmental_inputs", {}),
            "selected_species": record.get("selected_species", "Unknown"),
            "survival_probability": record.get("survival_probability", 0.0),
            "survival_percentage": record.get("survival_percentage", 0.0),
            "prediction": record.get("prediction", 0),
            "status": record.get("status", "Unknown"),
            "risk_level": record.get("risk_level", "Unknown"),
            "recommended_species": record.get("recommended_species", []),
            "recommendation_reason": record.get("recommendation_reason", ""),
            "notes": record.get("notes", "")
        }

        if self.is_connected and self.collection is not None:
            try:
                await self.collection.insert_one(doc.copy())
                return record_id
            except Exception as e:
                print(f"[Database] MongoDB save error ({e}), writing to fallback.")

        # Local Fallback
        try:
            history = self._read_local_fallback()
            history.insert(0, doc)
            self._write_local_fallback(history)
            return record_id
        except Exception as e:
            print(f"[Database] Error writing to local fallback: {e}")
            return record_id

    async def get_predictions(self, limit: int = 100) -> List[Dict[str, Any]]:
        if self.is_connected and self.collection is not None:
            try:
                cursor = self.collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit)
                results = await cursor.to_list(length=limit)
                return results
            except Exception as e:
                print(f"[Database] MongoDB read error ({e}), reading from fallback.")

        # Local Fallback
        history = self._read_local_fallback()
        return history[:limit]

    async def count_predictions(self) -> int:
        if self.is_connected and self.collection is not None:
            try:
                return await self.collection.count_documents({})
            except Exception:
                pass
        return len(self._read_local_fallback())

    async def clear_predictions(self) -> bool:
        if self.is_connected and self.collection is not None:
            try:
                await self.collection.delete_many({})
            except Exception:
                pass
        self._write_local_fallback([])
        return True

    def _read_local_fallback(self) -> List[Dict[str, Any]]:
        try:
            if os.path.exists(self.fallback_file):
                with open(self.fallback_file, "r") as f:
                    return json.load(f)
        except Exception:
            return []
        return []

    def _write_local_fallback(self, data: List[Dict[str, Any]]):
        try:
            with open(self.fallback_file, "w") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"[Database] Error writing fallback file: {e}")

db_manager = DatabaseManager()
