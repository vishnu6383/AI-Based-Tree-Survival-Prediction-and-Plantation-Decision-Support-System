"""
Tree Survival Training Dataset Generator (12,000 rows)
=====================================================
Generates a realistic synthetic training dataset for academic demonstration and prototyping.
Incorporates domain ecological rules for 10 high-yield fruit and crop tree species across 6 soil types and varied climate parameters.

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
    "Mango": {
        "opt_rain": (750, 2200),
        "opt_temp": (22, 38),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Black"],
        "opt_moisture": (30, 70),
        "min_sunlight": 7.0,
        "drought_resilience": 0.65,
        "waterlog_tolerance": 0.30,
        "base_hardiness": 0.76
    },
    "Guava": {
        "opt_rain": (600, 1800),
        "opt_temp": (20, 36),
        "pref_soils": ["Loamy", "Alluvial", "Red", "Sandy", "Clay"],
        "opt_moisture": (25, 75),
        "min_sunlight": 6.5,
        "drought_resilience": 0.85,
        "waterlog_tolerance": 0.45,
        "base_hardiness": 0.84
    },
    "Banana": {
        "opt_rain": (1200, 2800),
        "opt_temp": (22, 36),
        "pref_soils": ["Loamy", "Alluvial", "Clay", "Red"],
        "opt_moisture": (45, 85),
        "min_sunlight": 6.0,
        "drought_resilience": 0.35,
        "waterlog_tolerance": 0.50,
        "base_hardiness": 0.78
    },
    "Coconut": {
        "opt_rain": (1000, 2600),
        "opt_temp": (24, 36),
        "pref_soils": ["Sandy", "Alluvial", "Loamy", "Red"],
        "opt_moisture": (35, 80),
        "min_sunlight": 7.5,
        "drought_resilience": 0.60,
        "waterlog_tolerance": 0.60,
        "base_hardiness": 0.80
    },
    "Papaya": {
        "opt_rain": (800, 2000),
        "opt_temp": (22, 38),
        "pref_soils": ["Loamy", "Alluvial", "Sandy", "Red"],
        "opt_moisture": (30, 65),
        "min_sunlight": 7.0,
        "drought_resilience": 0.55,
        "waterlog_tolerance": 0.20,
        "base_hardiness": 0.74
    },
    "Pomegranate": {
        "opt_rain": (400, 1000),
        "opt_temp": (20, 38),
        "pref_soils": ["Loamy", "Sandy", "Red", "Alluvial", "Black"],
        "opt_moisture": (20, 60),
        "min_sunlight": 8.0,
        "drought_resilience": 0.88,
        "waterlog_tolerance": 0.25,
        "base_hardiness": 0.82
    },
    "Lemon": {
        "opt_rain": (600, 1500),
        "opt_temp": (18, 35),
        "pref_soils": ["Loamy", "Alluvial", "Sandy", "Red"],
        "opt_moisture": (25, 70),
        "min_sunlight": 7.0,
        "drought_resilience": 0.70,
        "waterlog_tolerance": 0.30,
        "base_hardiness": 0.80
    },
    "Jackfruit": {
        "opt_rain": (1000, 2600),
        "opt_temp": (20, 36),
        "pref_soils": ["Alluvial", "Loamy", "Red", "Clay"],
        "opt_moisture": (35, 75),
        "min_sunlight": 6.0,
        "drought_resilience": 0.65,
        "waterlog_tolerance": 0.30,
        "base_hardiness": 0.79
    },
    "Sapota": {
        "opt_rain": (700, 1800),
        "opt_temp": (20, 38),
        "pref_soils": ["Alluvial", "Sandy", "Loamy", "Black", "Red"],
        "opt_moisture": (30, 75),
        "min_sunlight": 6.5,
        "drought_resilience": 0.80,
        "waterlog_tolerance": 0.45,
        "base_hardiness": 0.82
    },
    "Amla": {
        "opt_rain": (400, 1400),
        "opt_temp": (18, 42),
        "pref_soils": ["Red", "Sandy", "Loamy", "Black", "Alluvial", "Clay"],
        "opt_moisture": (15, 65),
        "min_sunlight": 7.5,
        "drought_resilience": 0.92,
        "waterlog_tolerance": 0.40,
        "base_hardiness": 0.88
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
        deficit_t = (t_min - temp) / 15.0
        t_score = max(0.1, 1.0 - deficit_t * 1.5)
    else:
        excess_t = (temp - t_max) / 15.0
        t_score = max(0.1, 1.0 - excess_t * 1.5)

    # 3. Soil score
    if soil in prof["pref_soils"]:
        s_score = 1.0
    else:
        s_score = 0.55

    # 4. Moisture score
    m_min, m_max = prof["opt_moisture"]
    if m_min <= moisture <= m_max:
        m_score = 1.0
    elif moisture < m_min:
        m_deficit = (m_min - moisture) / 50.0
        m_score = max(0.2, 1.0 - m_deficit * (1.5 - prof["drought_resilience"]))
    else:
        m_excess = (moisture - m_max) / 50.0
        m_score = max(0.2, 1.0 - m_excess * (1.5 - prof["waterlog_tolerance"]))

    # 5. Sunlight score
    if sun >= prof["min_sunlight"]:
        sun_score = 1.0
    else:
        sun_deficit = (prof["min_sunlight"] - sun) / 6.0
        sun_score = max(0.3, 1.0 - sun_deficit)

    # 6. Water availability interaction
    if water == "High" and prof["waterlog_tolerance"] < 0.35 and moisture > 70:
        w_score = 0.65
    elif water == "Low" and prof["drought_resilience"] > 0.70:
        w_score = 0.95
    elif water == "Low" and prof["drought_resilience"] <= 0.50:
        w_score = 0.50
    else:
        w_score = 1.0

    # Weighted composite probability
    combined = (
        0.28 * r_score +
        0.22 * t_score +
        0.18 * s_score +
        0.16 * m_score +
        0.10 * sun_score +
        0.06 * w_score
    ) * score

    # Add realistic environmental noise
    noise = np.random.normal(0, 0.04)
    final_prob = float(np.clip(combined + noise, 0.02, 0.98))
    return final_prob

def generate_dataset(output_dir=None):
    if output_dir is None:
        output_dir = os.path.dirname(os.path.abspath(__file__))
    
    csv_path = os.path.join(output_dir, "tree_survival_training_dataset_12000.csv")
    excel_path = os.path.join(output_dir, "tree_survival_training_dataset_12000.xlsx")

    records = []
    samples_per_species = TOTAL_SAMPLES // len(SPECIES_LIST)

    for species in SPECIES_LIST:
        prof = SPECIES_PROFILES[species]
        r_min, r_max = prof["opt_rain"]
        t_min, t_max = prof["opt_temp"]

        for _ in range(samples_per_species):
            # 70% in realistic distribution around species preferences, 30% wider stress envelope
            if np.random.rand() < 0.70:
                rainfall = np.random.uniform(max(200, r_min - 300), min(4000, r_max + 400))
                temp = np.random.uniform(max(10, t_min - 4), min(45, t_max + 4))
                moisture = np.random.uniform(prof["opt_moisture"][0] - 10, min(95, prof["opt_moisture"][1] + 15))
                sunlight = np.random.uniform(max(3.0, prof["min_sunlight"] - 1.5), 11.5)
                soil = np.random.choice(prof["pref_soils"])
                water = np.random.choice(WATER_LEVELS, p=[0.25, 0.50, 0.25])
            else:
                rainfall = np.random.uniform(200, 4200)
                temp = np.random.uniform(10, 48)
                moisture = np.random.uniform(5, 95)
                sunlight = np.random.uniform(3.0, 12.0)
                soil = np.random.choice(SOIL_TYPES)
                water = np.random.choice(WATER_LEVELS, p=[0.33, 0.34, 0.33])

            rainfall = round(float(rainfall), 1)
            temp = round(float(temp), 1)
            moisture = round(float(np.clip(moisture, 5, 95)), 1)
            sunlight = round(float(np.clip(sunlight, 2.5, 12.0)), 1)

            prob = calculate_survival_prob(species, rainfall, temp, soil, moisture, sunlight, water)
            
            # Stochastic binary survival target based on probability
            survival = 1 if np.random.rand() < prob else 0

            records.append({
                "rainfall_mm": rainfall,
                "temperature_c": temp,
                "soil_type": soil,
                "soil_moisture_percent": moisture,
                "sunlight_hours": sunlight,
                "water_availability": water,
                "tree_species": species,
                "survival_probability_generated": round(prob, 4),
                "survival": survival
            })

    df = pd.DataFrame(records)
    
    # Shuffle dataset
    df = df.sample(frac=1.0, random_state=42).reset_index(drop=True)

    # Save to CSV
    df.to_csv(csv_path, index=False)
    print(f"Generated {len(df)} records in CSV at: {csv_path}")

    # Try saving to Excel
    try:
        df.to_excel(excel_path, index=False)
        print(f"Saved Excel version at: {excel_path}")
    except Exception as e:
        print(f"Excel generation skipped ({e})")

    return csv_path

if __name__ == "__main__":
    generate_dataset()
