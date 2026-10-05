"""
Species Knowledge Base and Plantation Guidance
==============================================
Contains verified botanical parameters, environmental tolerance ranges, 
maintenance guidelines, and ecological benefits for all 10 candidate species.
"""

ALL_SPECIES = [
    "Neem",
    "Teak",
    "Banyan",
    "Peepal",
    "Eucalyptus",
    "Sal",
    "Gulmohar",
    "Bamboo",
    "Mango",
    "Mahogany"
]

ALL_SOILS = ["Red", "Black", "Loamy", "Sandy", "Clay", "Alluvial"]
WATER_LEVELS = ["Low", "Medium", "High"]

SPECIES_KNOWLEDGE_BASE = {
    "Neem": {
        "scientific_name": "Azadirachta indica",
        "family": "Meliaceae",
        "optimal_rainfall_mm": (400, 1200),
        "optimal_temp_c": (21, 38),
        "compatible_soils": ["Red", "Sandy", "Loamy", "Black", "Alluvial"],
        "min_sunlight_hours": 6.0,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Moderate to Fast",
        "ecological_value": "Natural bio-pesticide, air purifier, soil enricher, high medicinal yield.",
        "plantation_guidance": {
            "pit_dimensions": "45 cm x 45 cm x 45 cm",
            "spacing_meters": "5m x 5m for agroforestry; 3m x 3m for boundary planting",
            "soil_preparation": "Mix native soil with 5 kg well-rotted farmyard manure (FYM) and 200g neem cake to deter root grubs.",
            "irrigation_schedule": "Water twice weekly for first 3 months; weekly during summer; drought hardy once taproot establishes.",
            "planting_season": "Onset of monsoon (June-July) for optimal root establishment.",
            "special_care": "Protect young saplings from livestock grazing during first 2 years. Avoid stagnant water zones."
        }
    },
    "Teak": {
        "scientific_name": "Tectona grandis",
        "family": "Lamiaceae",
        "optimal_rainfall_mm": (1200, 2500),
        "optimal_temp_c": (22, 36),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Black"],
        "min_sunlight_hours": 7.0,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Low to Moderate",
        "growth_rate": "Moderate",
        "ecological_value": "High timber value, substantial carbon storage, structural forestry.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "2.5m x 2.5m (1600 plants/ha) or 3m x 3m (1100 plants/ha)",
            "soil_preparation": "Requires deep well-draining soil with neutral to slightly alkaline pH (6.5 - 7.5). Avoid acidic soils.",
            "irrigation_schedule": "Deep irrigation every 10-14 days during dry seasons in first 3 years to accelerate diameter growth.",
            "planting_season": "Pre-monsoon or early monsoon using healthy root-shoot stumps.",
            "special_care": "Regular debudding and side pruning in years 1-4 to ensure clear knot-free commercial bole."
        }
    },
    "Banyan": {
        "scientific_name": "Ficus benghalensis",
        "family": "Moraceae",
        "optimal_rainfall_mm": (500, 2000),
        "optimal_temp_c": (16, 40),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Clay", "Black"],
        "min_sunlight_hours": 5.5,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Fast",
        "ecological_value": "Keystone species, extensive biodiversity shelter, avian food resource, massive carbon sink.",
        "plantation_guidance": {
            "pit_dimensions": "90 cm x 90 cm x 90 cm",
            "spacing_meters": "15m x 15m minimum due to massive canopy spread and prop roots",
            "soil_preparation": "Tolerates rugged and marginal soils. Enrich pit with rich organic compost.",
            "irrigation_schedule": "Water regularly during year 1; once prop roots touch ground it becomes largely self-sustaining.",
            "planting_season": "Monsoon season (July to September).",
            "special_care": "Plant away from foundation walls and masonry structures to prevent root intrusion."
        }
    },
    "Peepal": {
        "scientific_name": "Ficus religiosa",
        "family": "Moraceae",
        "optimal_rainfall_mm": (450, 2200),
        "optimal_temp_c": (15, 42),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Black", "Sandy", "Clay"],
        "min_sunlight_hours": 5.0,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Fast",
        "ecological_value": "24/7 oxygen release via Crassulacean Acid Metabolism, sacred grove cornerstone, bird habitat.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "12m x 12m in parks, avenues, or institutional campuses",
            "soil_preparation": "Hardy across rocky, clayey, and alluvial ground. Mix pit with 10 kg compost.",
            "irrigation_schedule": "Moderate watering during dry spells in early years.",
            "planting_season": "Monsoon or post-monsoon when humidity is high.",
            "special_care": "Maintain adequate clearance from subterranean pipes and foundation walls."
        }
    },
    "Eucalyptus": {
        "scientific_name": "Eucalyptus globulus / tereticornis",
        "family": "Myrtaceae",
        "optimal_rainfall_mm": (600, 1800),
        "optimal_temp_c": (18, 38),
        "compatible_soils": ["Loamy", "Sandy", "Red", "Alluvial"],
        "min_sunlight_hours": 7.0,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Very Fast",
        "ecological_value": "Fast biomass generation, industrial pulpwood, windbreak shelterbelt.",
        "plantation_guidance": {
            "pit_dimensions": "30 cm x 30 cm x 30 cm",
            "spacing_meters": "2m x 2m or 3m x 1.5m for high-density plantation",
            "soil_preparation": "Prefers well-aerated sandy loam; avoid waterlogged soils.",
            "irrigation_schedule": "Minimal supplementary irrigation; extracts moisture via deep taproot.",
            "planting_season": "Beginning of monsoon with clonal seedlings.",
            "special_care": "Avoid planting directly adjacent to drinking water reservoirs or crop root-zones."
        }
    },
    "Sal": {
        "scientific_name": "Shorea robusta",
        "family": "Dipterocarpaceae",
        "optimal_rainfall_mm": (1000, 3000),
        "optimal_temp_c": (20, 34),
        "compatible_soils": ["Loamy", "Red", "Alluvial", "Sandy"],
        "min_sunlight_hours": 5.5,
        "drought_tolerance": "Low to Moderate",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Slow to Moderate",
        "ecological_value": "Climax forest timber species, resin (dammar) extraction, wildlife watershed protection.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "3m x 3m with progressive thinning at year 7 and 12",
            "soil_preparation": "Prefers deep, moist, well-aerated sandy loam with acidic to sub-neutral pH.",
            "irrigation_schedule": "Regular hydration required during dry summer months for young seedlings.",
            "planting_season": "Sow fresh viable seeds immediately upon ripening at onset of rain.",
            "special_care": "Seeds lose viability within a week; saplings require shade during peak summer."
        }
    },
    "Gulmohar": {
        "scientific_name": "Delonix regia",
        "family": "Fabaceae",
        "optimal_rainfall_mm": (700, 2000),
        "optimal_temp_c": (20, 38),
        "compatible_soils": ["Loamy", "Sandy", "Alluvial", "Red"],
        "min_sunlight_hours": 7.5,
        "drought_tolerance": "Moderate to High",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Fast",
        "ecological_value": "Spectacular flaming red canopy, urban microclimate cooler, nectar source for pollinators.",
        "plantation_guidance": {
            "pit_dimensions": "50 cm x 50 cm x 50 cm",
            "spacing_meters": "6m x 6m along avenues or gardens",
            "soil_preparation": "Mix porous soil with coarse sand and compost to ensure swift drainage.",
            "irrigation_schedule": "Water when top 3 inches of soil dry out. Avoid overwatering in winter.",
            "planting_season": "Early monsoon season.",
            "special_care": "Stake young trees against high velocity winds; prune weak crotches early."
        }
    },
    "Bamboo": {
        "scientific_name": "Bambusa balcooa / Bambusoideae",
        "family": "Poaceae",
        "optimal_rainfall_mm": (1200, 3500),
        "optimal_temp_c": (18, 35),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Clay"],
        "min_sunlight_hours": 6.0,
        "drought_tolerance": "Low to Moderate",
        "waterlogging_tolerance": "High",
        "growth_rate": "Extremely Fast",
        "ecological_value": "Highest carbon sequestration per hectare, riverbank stabilization, green building material.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "4m x 4m or 5m x 5m between clumps",
            "soil_preparation": "Incorporate thick layer of organic mulch and compost to retain moisture.",
            "irrigation_schedule": "Requires generous moisture during shoot emergence in monsoon.",
            "planting_season": "Mid monsoon with rhizomes or tissue culture saplings.",
            "special_care": "Mulch root zones annually; thin out old culms after year 4 to encourage fresh shoots."
        }
    },
    "Mango": {
        "scientific_name": "Mangifera indica",
        "family": "Anacardiaceae",
        "optimal_rainfall_mm": (750, 2200),
        "optimal_temp_c": (22, 37),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Black"],
        "min_sunlight_hours": 7.0,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Moderate",
        "ecological_value": "Nutritional fruit supply, economic livelihood, dense canopy shade.",
        "plantation_guidance": {
            "pit_dimensions": "100 cm x 100 cm x 100 cm",
            "spacing_meters": "8m x 8m to 10m x 10m for standard orchards; 5m x 5m for ultra-high density",
            "soil_preparation": "Deep fertile alluvium or loam with 20 kg compost, 1 kg single superphosphate.",
            "irrigation_schedule": "Drip irrigation; withhold irrigation 2 months prior to flowering to stimulate bud break.",
            "planting_season": "July to August during calm overcast monsoon days.",
            "special_care": "Protect graft union above ground level; whitewash trunk to prevent sunscald and stem borers."
        }
    },
    "Mahogany": {
        "scientific_name": "Swietenia macrophylla",
        "family": "Meliaceae",
        "optimal_rainfall_mm": (1300, 3200),
        "optimal_temp_c": (22, 35),
        "compatible_soils": ["Alluvial", "Loamy", "Clay", "Red"],
        "min_sunlight_hours": 6.0,
        "drought_tolerance": "Low to Moderate",
        "waterlogging_tolerance": "Moderate to High",
        "growth_rate": "Fast to Moderate",
        "ecological_value": "Elite timber, soil conservation in humid zones, long-term carbon lockup.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "3m x 3m with progressive timber thinning",
            "soil_preparation": "Deep, fertile, moisture-retentive loam or alluvial soil with high organic matter.",
            "irrigation_schedule": "Regular watering during dry dry spells in formative years.",
            "planting_season": "Monsoon onset.",
            "special_care": "Watch for shoot borer (Hypsipyla grandella) in young plantations; remove infected leaders promptly."
        }
    }
}
