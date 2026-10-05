"""
Species Recommendation Endpoints
================================
"""

from fastapi import APIRouter, HTTPException, status
from ..schemas import EnvironmentalInput, RecommendationResponse
from ..services.recommendation_service import recommendation_service

router = APIRouter(tags=["Recommendation"])

@router.post("/recommend", response_model=RecommendationResponse)
async def recommend_species(env: EnvironmentalInput):
    try:
        response = recommendation_service.recommend_species(env)
        return response
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Recommendation error: {str(e)}"
        )
