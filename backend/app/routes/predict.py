"""
Prediction Endpoints
====================
"""

from fastapi import APIRouter, HTTPException, status
from ..schemas import PredictionRequest, PredictionResponse
from ..services.ml_service import ml_service
from ..database import db_manager

router = APIRouter(tags=["Prediction"])

@router.post("/predict", response_model=PredictionResponse)
async def predict_tree_survival(request: PredictionRequest):
    try:
        response = ml_service.predict_survival(request)
        
        # Automatically save prediction record into database history
        try:
            record_doc = {
                "environmental_inputs": request.model_dump(),
                "selected_species": request.tree_species,
                "survival_probability": response.survival_probability,
                "survival_percentage": response.survival_percentage,
                "prediction": response.survival_prediction,
                "status": response.status,
                "risk_level": response.risk_level,
                "recommended_species": [],
                "recommendation_reason": response.recommendation_reason
            }
            await db_manager.save_prediction(record_doc)
        except Exception as save_err:
            print(f"[History Auto-save Warning] {save_err}")

        return response
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference error: {str(e)}"
        )
