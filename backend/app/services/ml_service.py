"""
Machine Learning Inference Service
==================================
Loads the persisted scikit-learn Random Forest pipeline, evaluates survival
probabilities, maps risk classifications, and extracts decision factors.
"""

import os
import joblib
import pandas as pd
from typing import Dict, Any, Tuple
from ..config import settings
from ..schemas import PredictionRequest, PredictionResponse, PlantationGuidance, RuleBreakdown
from ..ml.species_data import SPECIES_KNOWLEDGE_BASE, ALL_SPECIES
from ..ml.rules import evaluate_species_rules

class MLService:
    def __init__(self):
        self.pipeline = None
        self.is_loaded: bool = False
        self.load_model()

    def load_model(self):
        model_path = settings.MODEL_PATH
        if os.path.exists(model_path):
            try:
                self.pipeline = joblib.load(model_path)
                self.is_loaded = True
                print(f"[ML Service] Model pipeline successfully loaded from: {model_path}")
            except Exception as e:
                print(f"[ML Service] Error loading model pipeline from {model_path}: {e}")
                self.is_loaded = False
        else:
            print(f"[ML Service] Model file not found at {model_path}. Will attempt to train on first use if needed.")
            self.is_loaded = False

    def classify_risk(self, probability: float) -> Tuple[int, str, str]:
        """
        Classifies risk based on configurable probability thresholds.
        Returns: (binary_prediction, status_label, risk_level_label)
        """
        if probability >= settings.THRESHOLD_HIGH_SURVIVAL:
            return 1, "Likely to Thrive", "Low Risk"
        elif probability >= settings.THRESHOLD_MODERATE_SURVIVAL:
            return 1, "Moderate Viability", "Medium Risk"
        else:
            return 0, "High Failure Risk", "High Risk"

    def predict_survival(self, request: PredictionRequest) -> PredictionResponse:
        if not self.is_loaded or self.pipeline is None:
            self.load_model()
            if not self.is_loaded or self.pipeline is None:
                raise RuntimeError(
                    "Model pipeline is not loaded. Please ensure 'train_model.py' has been executed."
                )

        # Prepare input dataframe matching pipeline expectations
        input_dict = {
            "rainfall_mm": [request.rainfall_mm],
            "temperature_c": [request.temperature_c],
            "soil_type": [request.soil_type],
            "soil_moisture_percent": [request.soil_moisture_percent],
            "sunlight_hours": [request.sunlight_hours],
            "water_availability": [request.water_availability],
            "tree_species": [request.tree_species]
        }
        df_input = pd.DataFrame(input_dict)

        # Model Inference via predict_proba
        proba_array = self.pipeline.predict_proba(df_input)
        # Probability of class 1 (survived)
        if proba_array.shape[1] > 1:
            raw_prob = float(proba_array[0, 1])
        else:
            raw_prob = float(proba_array[0, 0])

        survival_prob = round(raw_prob, 4)
        survival_percentage = round(survival_prob * 100.0, 1)

        binary_pred, status, risk_level = self.classify_risk(survival_prob)

        # Rule-based validation and reasoning
        rule_eval = evaluate_species_rules(
            species=request.tree_species,
            rainfall_mm=request.rainfall_mm,
            temperature_c=request.temperature_c,
            soil_type=request.soil_type,
            soil_moisture_percent=request.soil_moisture_percent,
            sunlight_hours=request.sunlight_hours,
            water_availability=request.water_availability
        )

        # Botanical profile & guidance
        profile = SPECIES_KNOWLEDGE_BASE.get(request.tree_species, {})
        guidance_dict = profile.get("plantation_guidance", {
            "pit_dimensions": "50 cm x 50 cm x 50 cm",
            "spacing_meters": "4m x 4m",
            "soil_preparation": "Enrich pit with compost.",
            "irrigation_schedule": "Water regularly during early months.",
            "planting_season": "Onset of monsoon.",
            "special_care": "Protect from cattle."
        })

        plantation_guidance = PlantationGuidance(**guidance_dict)
        rule_breakdown = RuleBreakdown(
            strengths=rule_eval["strengths"],
            warnings=rule_eval["warnings"],
            overall_compatibility=rule_eval["overall_compatibility"]
        )

        # Recommendation reason synthesis
        rec_reason = (
            f"The Random Forest model estimated a {survival_percentage}% survival viability ({risk_level}). "
            f"{rule_eval['reason']}"
        )

        input_summary = {
            "rainfall_mm": request.rainfall_mm,
            "temperature_c": request.temperature_c,
            "soil_type": request.soil_type,
            "soil_moisture_percent": request.soil_moisture_percent,
            "sunlight_hours": request.sunlight_hours,
            "water_availability": request.water_availability
        }

        return PredictionResponse(
            tree_species=request.tree_species,
            scientific_name=profile.get("scientific_name", request.tree_species),
            survival_probability=survival_prob,
            survival_percentage=survival_percentage,
            survival_prediction=binary_pred,
            status=status,
            risk_level=risk_level,
            recommendation_reason=rec_reason,
            input_summary=input_summary,
            plantation_guidance=plantation_guidance,
            rule_breakdown=rule_breakdown,
            academic_notice=settings.ACADEMIC_NOTICE
        )

ml_service = MLService()
