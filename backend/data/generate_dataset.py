"""
Tree Survival Training Dataset Generator (12,000 rows)
=====================================================
Generates a realistic synthetic training dataset for academic demonstration and prototyping.
Incorporates domain ecological rules for 10 tree species across 6 soil types and varied climate parameters.

Columns Generated:
- rainfall_mm (float)
- temperature_c (float)
- soil_type (str)
- soil_moisture_percent (float)
- sunlight_hours (float)
- water_availability (str)
- tree_species (str)
- survival_probability_generated (float) -> audit field only
- survival (int: 0 or 1)
"""

import os
import numpy as np
import pandas as pd

# Set fixed random seed for reproducibility
np.random.seed(42)

TOTAL_SAMPLES = 12000

SPECIES_PROFILES = {
    "Neem": {
        "opt_rain": (400, 1200),
        "opt_temp": (21, 38),
        "pref_soils": ["Red", "Sandy", "Loamy", "Black", "Alluvial"],
        "opt_moisture": (15, 60),
        "min_sunlight": 6.0,
        "drought_resilience": 0.90,
        "waterlog_tolerance": 0.25,
        "base_hardiness": 0.78
    },
    "Teak": {
        "opt_rain": (1200, 2500),
        "opt_temp": (22, 36),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Black"],
        "opt_moisture": (35, 75),
        "min_sunlight": 7.0,
        "drought_resilience": 0.55,
        "waterlog_tolerance": 0.35,
        "base_hardiness": 0.72
    },
    "Banyan": {
        "opt_rain": (500, 2000),
        "opt_temp": (16, 40),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Clay", "Black"],
        "opt_moisture": (25, 80),
        "min_sunlight": 5.5,
        "drought_resilience": 0.85,
        "waterlog_tolerance": 0.60,
        "base_hardiness": 0.85
    },
    "Peepal": {
        "opt_rain": (450, 2200),
        "opt_temp": (15, 42),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Black", "Sandy", "Clay"],
        "opt_moisture": (20, 80),
        "min_sunlight": 5.0,
        "drought_resilience": 0.88,
        "waterlog_tolerance": 0.55,
        "base_hardiness": 0.86
    },
    "Eucalyptus": {
        "opt_rain": (600, 1800),
        "opt_temp": (18, 38),
        "pref_soils": ["Loamy", "Sandy", "Red", "Alluvial"],
        "opt_moisture": (20, 65),
        "min_sunlight": 7.0,
        "drought_resilience": 0.80,
        "waterlog_tolerance": 0.40,
        "base_hardiness": 0.80
    },
    "Sal": {
        "opt_rain": (1000, 3000),
        "opt_temp": (20, 34),
        "pref_soils": ["Loamy", "Red", "Alluvial", "Sandy"],
        "opt_moisture": (40, 80),
        "min_sunlight": 5.5,
        "drought_resilience": 0.45,
        "waterlog_tolerance": 0.45,
        "base_hardiness": 0.68
    },
    "Gulmohar": {
        "opt_rain": (700, 2000),
        "opt_temp": (20, 38),
        "pref_soils": ["Loamy", "Sandy", "Alluvial", "Red"],
        "opt_moisture": (25, 70),
        "min_sunlight": 7.5,
        "drought_resilience": 0.70,
        "waterlog_tolerance": 0.30,
        "base_hardiness": 0.74
    },
    "Bamboo": {
        "opt_rain": (1200, 3500),
        "opt_temp": (18, 35),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Clay"],
        "opt_moisture": (45, 90),
        "min_sunlight": 6.0,
        "drought_resilience": 0.40,
        "waterlog_tolerance": 0.80,
        "base_hardiness": 0.82
    },
    "Mango": {
        "opt_rain": (750, 2200),
        "opt_temp": (22, 37),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Black"],
        "opt_moisture": (30, 70),
        "min_sunlight": 7.0,
        "drought_resilience": 0.65,
        "waterlog_tolerance": 0.30,
        "base_hardiness": 0.75
    },
    "Mahogany": {
        "opt_rain": (1300, 3200),
        "opt_temp": (22, 35),
        "pref_soils": ["Alluvial", "Loamy", "Clay", "Red"],
        "opt_moisture": (40, 85),
        "min_sunlight": 6.0,
        "drought_resilience": 0.45,
        "waterlog_tolerance": 0.65,
        "base_hardiness": 0.70
    }
}

SOIL_TYPES = ["Red", "Black", "Loamy", "Sandy", "Clay", "Alluvial"]
WATER_LEVELS = ["Low", "Medium", "High"]
SPECIES_LIST = list(SPECIES_PROFILES.keys())

def calculate_survival_prob(species, rain, temp, soil, moisture, sun, water):
    prof = SPECIES_PROFILES[species]
    score = prof["base_hardiness"]

    # 1. Rainfall score
    r_min, r_max = prof["opt_rain"]
    if r_min <= rain <= r_max:
        r_score = 1.0
    elif rain < r_min:
        deficit = (r_min - rain) / r_min
        r_score = max(0.1, 1.0 - (deficit * (1.8 - prof["drought_resilience"])))
    else:
        excess = (rain - r_max) / 1500.0
        r_score = max(0.2, 1.0 - (excess * (1.6 - prof["waterlog_tolerance"])))

    # 2. Temperature score
    t_min, t_max = prof["opt_temp"]
    if t_min <= temp <= t_max:
        t_score = 1.0
    elif temp < t_min:
        t_score = max(0.15, 1.0 - (t_min - temp) * 0.08)
    else:
        t_score = max(0.10, 1.0 - (temp - t_max) * 0.09)

    # 3. Soil suitability
    if soil in prof["pref_soils"]:
        soil_idx = prof["pref_soils"].index(soil)
        soil_score = 1.0 - (soil_idx * 0.05)
    else:
        soil_score = 0.40

    # 4. Moisture score
    m_min, m_max = prof["opt_moisture"]
    if m_min <= moisture <= m_max:
        m_score = 1.0
    elif moisture < m_min:
        m_score = max(0.15, 1.0 - ((m_min - moisture) / 40.0) * (1.5 - prof["drought_resilience"]))
    else:
        m_score = max(0.2, 1.0 - ((moisture - m_max) / 40.0) * (1.4 - prof["waterlog_tolerance"]))

    # 5. Sunlight score
    if sun >= prof["min_sunlight"]:
        sun_score = 1.0
    else:
        sun_score = max(0.3, 1.0 - (prof["min_sunlight"] - sun) * 0.16)

    # 6. Water availability interaction
    if water == "Low":
        w_score = 0.55 if prof["drought_resilience"] >= 0.75 else 0.30
    elif water == "Medium":
        w_score = 0.90
    else:  # High
        w_score = 0.75 if prof["waterlog_tolerance"] < 0.35 else 0.95

    # Weighted composite probability
    raw_prob = (
        0.22 * r_score +
        0.18 * t_score +
        0.18 * soil_score +
        0.18 * m_score +
        0.12 * sun_score +
        0.12 * w_score
    )

    # Blend with base species hardiness and clip
    final_prob = np.clip(raw_prob * 0.88 + score * 0.12, 0.02, 0.98)
    return round(float(final_prob), 4)

def generate_dataset():
    data = []
    for _ in range(TOTAL_SAMPLES):
        species = np.random.choice(SPECIES_LIST)
        
        # Simulate realistic distributions
        rain = np.random.triangular(250, 1100, 3600)
        temp = np.random.normal(28, 6.5)
        temp = np.clip(temp, 10.0, 48.0)
        soil = np.random.choice(SOIL_TYPES, p=[0.20, 0.18, 0.25, 0.12, 0.10, 0.15])
        moisture = np.random.beta(2.5, 2.5) * 85 + 5
        sunlight = np.random.normal(7.5, 2.2)
        sunlight = np.clip(sunlight, 3.0, 12.0)
        
        # Water availability correlated with rainfall
        if rain < 700:
            water = np.random.choice(WATER_LEVELS, p=[0.60, 0.35, 0.05])
        elif rain < 1800:
            water = np.random.choice(WATER_LEVELS, p=[0.20, 0.60, 0.20])
        else:
            water = np.random.choice(WATER_LEVELS, p=[0.05, 0.35, 0.60])

        prob = calculate_survival_prob(
            species=species,
            rain=rain,
            temp=temp,
            soil=soil,
            moisture=moisture,
            sun=sunlight,
            water=water
        )

        # Binary survival outcome with logistic sampling
        survival_outcome = int(np.random.binomial(1, prob))

        data.append({
            "rainfall_mm": round(float(rain), 2),
            "temperature_c": round(float(temp), 2),
            "soil_type": soil,
            "soil_moisture_percent": round(float(moisture), 2),
            "sunlight_hours": round(float(sunlight), 2),
            "water_availability": water,
            "tree_species": species,
            "survival_probability_generated": prob,
            "survival": survival_outcome
        })

    df = pd.DataFrame(data)
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_csv = os.path.join(script_dir, "tree_survival_training_dataset_12000.csv")
    df.to_csv(output_csv, index=False)
    print(f"Successfully generated {len(df)} rows dataset at: {output_csv}")
    print("Class distribution in generated dataset:")
    print(df["survival"].value_counts(normalize=True))
    return output_csv

if __name__ == "__main__":
    generate_dataset()
