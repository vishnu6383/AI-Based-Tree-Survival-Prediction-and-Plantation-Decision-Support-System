"""
Ecological Rules and Decision-Support Reasoning Engine
======================================================
Combines model predictions with transparent rule-based ecological checks
for soil, rainfall, temperature, moisture, sunlight, and water availability.
"""

from typing import Dict, Any, List
from .species_data import SPECIES_KNOWLEDGE_BASE

def evaluate_species_rules(
    species: str,
    rainfall_mm: float,
    temperature_c: float,
    soil_type: str,
    soil_moisture_percent: float,
    sunlight_hours: float,
    water_availability: str
) -> Dict[str, Any]:
    """
    Performs transparent rule-based compatibility checking for a candidate species.
    Returns strengths, warnings, score adjustment, and synthesized explanation.
    """
    profile = SPECIES_KNOWLEDGE_BASE.get(species)
    if not profile:
        return {
            "strengths": ["Standard candidate species"],
            "warnings": [],
            "overall_compatibility": "Moderate",
            "reason": f"General assessment for {species}."
        }

    strengths: List[str] = []
    warnings: List[str] = []

    # 1. Soil Match
    if soil_type in profile["compatible_soils"]:
        strengths.append(f"{soil_type} soil is well-suited for {species}'s root architecture.")
    else:
        warnings.append(f"{soil_type} soil is suboptimal; {species} prefers {', '.join(profile['compatible_soils'][:3])}.")

    # 2. Rainfall Match
    r_min, r_max = profile["optimal_rainfall_mm"]
    if r_min <= rainfall_mm <= r_max:
        strengths.append(f"Rainfall ({rainfall_mm} mm) is within optimal range ({r_min}-{r_max} mm).")
    elif rainfall_mm < r_min:
        warnings.append(f"Rainfall ({rainfall_mm} mm) is below optimal ({r_min} mm); supplemental irrigation needed.")
    else:
        warnings.append(f"High rainfall ({rainfall_mm} mm) exceeds optimal ({r_max} mm); ensure adequate surface drainage.")

    # 3. Temperature Match
    t_min, t_max = profile["optimal_temp_c"]
    if t_min <= temperature_c <= t_max:
        strengths.append(f"Temperature ({temperature_c}°C) is ideal for vegetative growth ({t_min}-{t_max}°C).")
    elif temperature_c < t_min:
        warnings.append(f"Temperature ({temperature_c}°C) is below thermal baseline ({t_min}°C); frost protection advised.")
    else:
        warnings.append(f"Elevated temperature ({temperature_c}°C) may cause transpiration stress; mulch heavily.")

    # 4. Sunlight Match
    min_sun = profile["min_sunlight_hours"]
    if sunlight_hours >= min_sun:
        strengths.append(f"Sunlight ({sunlight_hours} hrs/day) meets photosynthetic demand (min {min_sun} hrs).")
    else:
        warnings.append(f"Sunlight ({sunlight_hours} hrs/day) is below recommended ({min_sun} hrs); slow growth expected.")

    # 5. Water Availability & Moisture Match
    if water_availability == "Low" and profile["drought_tolerance"] in ["High", "Moderate"]:
        strengths.append(f"Possesses high drought resilience suitable for low water availability.")
    elif water_availability == "High" and profile["waterlogging_tolerance"] == "Low":
        warnings.append(f"Susceptible to root asphyxiation in waterlogged soils under high water supply.")

    # Synthesize comprehensive explanation
    if len(warnings) == 0:
        overall = "High"
        reason = f"Excellent ecological match: rainfall, {soil_type} soil, and thermal parameters align closely with {species}'s native envelope."
    elif len(strengths) >= len(warnings):
        overall = "Moderate to High"
        reasons_summary = "; ".join(strengths[:2])
        warning_summary = warnings[0] if warnings else ""
        reason = f"Favorable conditions ({reasons_summary}), though note: {warning_summary}"
    else:
        overall = "Suboptimal"
        warning_summary = "; ".join(warnings[:2])
        reason = f"Challenging environmental fit due to {warning_summary}"

    return {
        "strengths": strengths,
        "warnings": warnings,
        "overall_compatibility": overall,
        "reason": reason
    }
