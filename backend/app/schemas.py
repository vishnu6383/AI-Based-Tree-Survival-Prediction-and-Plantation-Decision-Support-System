"""
Pydantic Data Validation Schemas
================================
Defines strict schemas for input validation, predictions, recommendations,
history records, and health checks.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field, field_validator
from datetime import datetime

class EnvironmentalInput(BaseModel):
    rainfall_mm: float = Field(
        ...,
        ge=0.0,
        le=6000.0,
        description="Annual or seasonal rainfall in millimeters",
        examples=[1200.0]
    )
    temperature_c: float = Field(
        ...,
        ge=-10.0,
        le=55.0,
        description="Average ambient temperature in Celsius",
        examples=[28.5]
    )
    soil_type: str = Field(
        ...,
        description="Primary soil classification: Red, Black, Loamy, Sandy, Clay, Alluvial",
        examples=["Loamy"]
    )
    soil_moisture_percent: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Estimated soil moisture percentage (0-100%)",
        examples=[45.0]
    )
    sunlight_hours: float = Field(
        ...,
        ge=0.0,
        le=16.0,
        description="Approximate daily sunlight hours (0-16 hrs)",
        examples=[7.5]
    )
    water_availability: str = Field(
        ...,
        description="Local water availability tier: Low, Medium, High",
        examples=["Medium"]
    )

    @field_validator("soil_type")
    @classmethod
    def validate_soil_type(cls, v: str) -> str:
        valid_soils = ["Red", "Black", "Loamy", "Sandy", "Clay", "Alluvial"]
        matched = [s for s in valid_soils if s.lower() == v.strip().lower()]
        if not matched:
            raise ValueError(f"Invalid soil_type '{v}'. Must be one of: {', '.join(valid_soils)}")
        return matched[0]

    @field_validator("water_availability")
    @classmethod
    def validate_water_availability(cls, v: str) -> str:
        valid_tiers = ["Low", "Medium", "High"]
        matched = [t for t in valid_tiers if t.lower() == v.strip().lower()]
        if not matched:
            raise ValueError(f"Invalid water_availability '{v}'. Must be one of: {', '.join(valid_tiers)}")
        return matched[0]

class PredictionRequest(EnvironmentalInput):
    tree_species: str = Field(
        ...,
        description="Target candidate tree species to evaluate",
        examples=["Neem"]
    )

    @field_validator("tree_species")
    @classmethod
    def validate_tree_species(cls, v: str) -> str:
        valid_species = [
            "Mango", "Guava", "Banana", "Coconut", "Papaya",
            "Pomegranate", "Lemon", "Jackfruit", "Sapota", "Amla"
        ]
        matched = [s for s in valid_species if s.lower() == v.strip().lower()]
        if not matched:
            raise ValueError(f"Invalid tree_species '{v}'. Supported: {', '.join(valid_species)}")
        return matched[0]

class PlantationGuidance(BaseModel):
    pit_dimensions: str
    spacing_meters: str
    soil_preparation: str
    irrigation_schedule: str
    planting_season: str
    special_care: str

class RuleBreakdown(BaseModel):
    strengths: List[str]
    warnings: List[str]
    overall_compatibility: str

class PredictionResponse(BaseModel):
    tree_species: str
    scientific_name: Optional[str] = None
    survival_probability: float = Field(..., description="Calculated survival probability (0.00 to 1.00)")
    survival_percentage: float = Field(..., description="Survival probability formatted as percentage (0 to 100%)")
    survival_prediction: int = Field(..., description="Binary prediction: 1 = Suitable / Survives, 0 = Unsuitable")
    status: str = Field(..., description="Human readable status: Likely to Thrive, Moderate Viability, High Failure Risk")
    risk_level: str = Field(..., description="Risk category: Low Risk, Medium Risk, High Risk")
    recommendation_reason: str = Field(..., description="Detailed explanation combining ML probability and botanical rules")
    input_summary: Dict[str, Any]
    plantation_guidance: Optional[PlantationGuidance] = None
    rule_breakdown: Optional[RuleBreakdown] = None
    academic_notice: str

class SpeciesRecommendation(BaseModel):
    rank: int
    name: str
    scientific_name: str
    survival_probability: float
    survival_percentage: float
    risk_level: str
    status: str
    reason: str
    strengths: List[str]
    warnings: List[str]
    basic_plantation_guidance: Dict[str, str]

class RecommendationResponse(BaseModel):
    input_summary: Dict[str, Any]
    top_species: List[SpeciesRecommendation]
    all_species_ranking: List[SpeciesRecommendation]
    academic_notice: str

class SavePredictionRequest(BaseModel):
    environmental_inputs: Dict[str, Any]
    selected_species: str
    survival_probability: float
    survival_percentage: float
    prediction: int
    status: str
    risk_level: str
    recommended_species: List[str] = []
    recommendation_reason: Optional[str] = None
    notes: Optional[str] = ""

class PredictionHistoryItem(BaseModel):
    id: str
    timestamp: str
    environmental_inputs: Dict[str, Any]
    selected_species: str
    survival_probability: float
    survival_percentage: float
    prediction: int
    status: str
    risk_level: str
    recommended_species: List[str] = []
    recommendation_reason: Optional[str] = None
    notes: Optional[str] = ""

class HealthResponse(BaseModel):
    status: str
    project_name: str
    version: str
    model_loaded: bool
    database_connected: bool
    database_mode: str
    total_predictions_stored: int
    candidate_species: List[str]
    supported_soil_types: List[str]
