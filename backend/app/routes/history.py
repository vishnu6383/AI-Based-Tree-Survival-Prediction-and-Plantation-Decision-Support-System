"""
Prediction History Endpoints
============================
"""

from typing import List
from fastapi import APIRouter, HTTPException, status, Query
from ..schemas import SavePredictionRequest, PredictionHistoryItem
from ..database import db_manager

router = APIRouter(tags=["History & Database"])

@router.post("/predictions", response_model=dict, status_code=status.HTTP_201_CREATED)
@router.post("/prediction", response_model=dict, status_code=status.HTTP_201_CREATED)
async def save_prediction_record(payload: SavePredictionRequest):
    try:
        record_id = await db_manager.save_prediction(payload.model_dump())
        return {
            "success": True,
            "message": "Prediction record successfully saved to history",
            "id": record_id
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database save error: {str(e)}"
        )

@router.get("/predictions", response_model=List[PredictionHistoryItem])
async def get_prediction_history(limit: int = Query(default=100, ge=1, le=500)):
    try:
        records = await db_manager.get_predictions(limit=limit)
        return records
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database fetch error: {str(e)}"
        )

@router.delete("/predictions", response_model=dict)
async def clear_prediction_history():
    try:
        await db_manager.clear_predictions()
        return {"success": True, "message": "Prediction history cleared"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to clear history: {str(e)}"
        )
