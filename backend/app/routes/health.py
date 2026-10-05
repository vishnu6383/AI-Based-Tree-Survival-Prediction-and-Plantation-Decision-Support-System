"""
System Health and Model Metrics Endpoints
=========================================
"""

import os
import json
from fastapi import APIRouter
from ..config import settings
from ..schemas import HealthResponse
from ..database import db_manager
from ..services.ml_service import ml_service
from ..ml.species_data import ALL_SPECIES, ALL_SOILS

router = APIRouter(tags=["Health & System"])

@router.get("/health", response_model=HealthResponse)
async def get_health():
    total_preds = await db_manager.count_predictions()
    return HealthResponse(
        status="healthy",
        project_name=settings.PROJECT_NAME,
        version=settings.VERSION,
        model_loaded=ml_service.is_loaded,
        database_connected=db_manager.is_connected,
        database_mode=db_manager.mode,
        total_predictions_stored=total_preds,
        candidate_species=ALL_SPECIES,
        supported_soil_types=ALL_SOILS
    )

@router.get("/metrics")
async def get_model_metrics():
    """
    Returns the trained model metrics, confusion matrix, and feature importances.
    """
    metrics = {}
    feature_importances = []

    if os.path.exists(settings.METRICS_PATH):
        try:
            with open(settings.METRICS_PATH, "r") as f:
                metrics = json.load(f)
        except Exception as e:
            metrics = {"error": f"Failed to load metrics: {e}"}

    if os.path.exists(settings.FEATURE_IMPORTANCE_PATH):
        try:
            with open(settings.FEATURE_IMPORTANCE_PATH, "r") as f:
                feature_importances = json.load(f)
        except Exception as e:
            feature_importances = []

    return {
        "metrics": metrics,
        "feature_importances": feature_importances
    }

@router.get("/species")
async def get_all_species():
    """
    Returns full botanical profiles and plantation parameters for all 10 candidate species.
    """
    from ..ml.species_data import SPECIES_KNOWLEDGE_BASE
    species_list = []
    for name, data in SPECIES_KNOWLEDGE_BASE.items():
        species_list.append({
            "name": name,
            **data
        })
    return species_list
