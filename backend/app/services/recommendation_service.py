"""
Species Recommendation Engine Service
=====================================
Evaluates candidate species against supplied environmental parameters,
ranks them by predicted survival probability, blends rule-based checks,
and returns the top recommended species alongside complete rankings and plantation guidance.
"""

from typing import List
import pandas as pd
from ..config import settings
from ..schemas import (
    EnvironmentalInput,
    RecommendationResponse,
    SpeciesRecommendation
)
from ..ml.species_data import ALL_SPECIES, SPECIES_KNOWLEDGE_BASE
from ..ml.rules import evaluate_species_rules
from .ml_service import ml_service

class RecommendationService:
    def recommend_species(self, env: EnvironmentalInput) -> RecommendationResponse:
        if not ml_service.is_loaded or ml_service.pipeline is None:
            ml_service.load_model()
            if not ml_service.is_loaded or ml_service.pipeline is None:
                raise RuntimeError("Model pipeline is not loaded. Please train the model first.")

        # Construct batch dataframe for all candidate species
        rows = []
        for sp in ALL_SPECIES:
            rows.append({
                "rainfall_mm": env.rainfall_mm,
                "temperature_c": env.temperature_c,
                "soil_type": env.soil_type,
                "soil_moisture_percent": env.soil_moisture_percent,
                "sunlight_hours": env.sunlight_hours,
                "water_availability": env.water_availability,
                "tree_species": sp
            })
        
        df_batch = pd.DataFrame(rows)
        proba_matrix = ml_service.pipeline.predict_proba(df_batch)

        recommendations: List[SpeciesRecommendation] = []

        for idx, sp in enumerate(ALL_SPECIES):
            if proba_matrix.shape[1] > 1:
                prob = float(proba_matrix[idx, 1])
            else:
                prob = float(proba_matrix[idx, 0])

            prob = round(prob, 4)
            percentage = round(prob * 100.0, 1)

            _, status, risk_level = ml_service.classify_risk(prob)
            profile = SPECIES_KNOWLEDGE_BASE.get(sp, {})
            scientific_name = profile.get("scientific_name", sp)

            rule_eval = evaluate_species_rules(
                species=sp,
                rainfall_mm=env.rainfall_mm,
                temperature_c=env.temperature_c,
                soil_type=env.soil_type,
                soil_moisture_percent=env.soil_moisture_percent,
                sunlight_hours=env.sunlight_hours,
                water_availability=env.water_availability
            )

            rec_item = SpeciesRecommendation(
                rank=0,  # will be set after sorting
                name=sp,
                scientific_name=scientific_name,
                survival_probability=prob,
                survival_percentage=percentage,
                risk_level=risk_level,
                status=status,
                reason=rule_eval["reason"],
                strengths=rule_eval["strengths"],
                warnings=rule_eval["warnings"],
                basic_plantation_guidance=profile.get("plantation_guidance", {})
            )
            recommendations.append(rec_item)

        # Sort descending by survival probability
        recommendations.sort(key=lambda x: x.survival_probability, reverse=True)

        # Assign ranks
        for rank_idx, item in enumerate(recommendations, start=1):
            item.rank = rank_idx

        top_3 = recommendations[:3]

        input_summary = {
            "rainfall_mm": env.rainfall_mm,
            "temperature_c": env.temperature_c,
            "soil_type": env.soil_type,
            "soil_moisture_percent": env.soil_moisture_percent,
            "sunlight_hours": env.sunlight_hours,
            "water_availability": env.water_availability
        }

        return RecommendationResponse(
            input_summary=input_summary,
            top_species=top_3,
            all_species_ranking=recommendations,
            academic_notice=settings.ACADEMIC_NOTICE
        )

recommendation_service = RecommendationService()
