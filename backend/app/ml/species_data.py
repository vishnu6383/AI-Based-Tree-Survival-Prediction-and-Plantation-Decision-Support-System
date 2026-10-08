"""
Species Knowledge Base and Plantation Guidance
==============================================
Contains verified botanical parameters, environmental tolerance ranges, 
maintenance guidelines, and high-yield agroforestry parameters for 10 yield-giving candidate fruit & crop tree species.
"""

ALL_SPECIES = [
    "Mango",
    "Guava",
    "Banana",
    "Coconut",
    "Papaya",
    "Pomegranate",
    "Lemon",
    "Jackfruit",
    "Sapota",
    "Amla"
]

ALL_SOILS = ["Red", "Black", "Loamy", "Sandy", "Clay", "Alluvial"]
WATER_LEVELS = ["Low", "Medium", "High"]

SPECIES_KNOWLEDGE_BASE = {
    "Mango": {
        "scientific_name": "Mangifera indica",
        "family": "Anacardiaceae",
        "optimal_rainfall_mm": (750, 2200),
        "optimal_temp_c": (22, 38),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Black"],
        "min_sunlight_hours": 7.0,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Moderate",
        "ecological_value": "High commercial fruit yield, sweet edible produce, dense canopy shade and carbon sequestration.",
        "plantation_guidance": {
            "pit_dimensions": "100 cm x 100 cm x 100 cm",
            "spacing_meters": "8m x 8m to 10m x 10m for standard orchards; 5m x 5m for ultra-high density",
            "soil_preparation": "Deep fertile alluvium or loam with 20 kg farmyard manure (FYM), 1 kg single superphosphate.",
            "irrigation_schedule": "Drip irrigation twice weekly in early years; withhold irrigation 2 months prior to flowering to stimulate flower bud initiation.",
            "planting_season": "July to August during calm overcast monsoon days.",
            "special_care": "Protect graft union 15 cm above ground level; whitewash trunk to prevent sunscald and stem borer attacks."
        }
    },
    "Guava": {
        "scientific_name": "Psidium guajava",
        "family": "Myrtaceae",
        "optimal_rainfall_mm": (600, 1800),
        "optimal_temp_c": (20, 36),
        "compatible_soils": ["Loamy", "Alluvial", "Red", "Sandy", "Clay"],
        "min_sunlight_hours": 6.5,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Fast",
        "ecological_value": "Prolific high-density fruit yield, extremely rich in Vitamin C and pectin, highly adaptable to diverse soil pH.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "4m x 4m (standard) or 3m x 2m (meadow ultra-high density)",
            "soil_preparation": "Mix soil with 15 kg compost, 250g bone meal, and 100g trichoderma bio-fungicide.",
            "irrigation_schedule": "Irrigate at 7-10 day intervals during summer; drought hardy once taproot establishes deep.",
            "planting_season": "Onset of monsoon (June-August) or spring (February-March).",
            "special_care": "Annual canopy heading back and center pruning after winter harvest to induce heavy bearing fruiting shoots."
        }
    },
    "Banana": {
        "scientific_name": "Musa acuminata",
        "family": "Musaceae",
        "optimal_rainfall_mm": (1200, 2800),
        "optimal_temp_c": (22, 36),
        "compatible_soils": ["Loamy", "Alluvial", "Clay", "Red"],
        "min_sunlight_hours": 6.0,
        "drought_tolerance": "Low",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Extremely Fast",
        "ecological_value": "Year-round food & potassium staple yield, massive organic biomass recycling, rapid harvest turnaround (10-12 months).",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "1.8m x 1.8m (3000 plants/ha) or 2m x 2m with drip lines",
            "soil_preparation": "Deep, nutrient-rich soil enriched with 10 kg compost, 500g neem cake, and 20g carbofuran/bio-nematicide.",
            "irrigation_schedule": "Frequent irrigation; requires 20-25 liters of water per day per plant via drip system.",
            "planting_season": "May-June or September-October using healthy sword suckers or tissue culture plantlets.",
            "special_care": "Desuckering (removing unwanted side shoots), earthing up at month 4, and propping heavy fruiting bunches with bamboo poles."
        }
    },
    "Coconut": {
        "scientific_name": "Cocos nucifera",
        "family": "Arecaceae",
        "optimal_rainfall_mm": (1000, 2600),
        "optimal_temp_c": (24, 36),
        "compatible_soils": ["Sandy", "Alluvial", "Loamy", "Red"],
        "min_sunlight_hours": 7.5,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Moderate",
        "ecological_value": "Multi-purpose lifetime economic yield (tender water, copra, oil, coir, shell), coastal windbreak and soil stabilization.",
        "plantation_guidance": {
            "pit_dimensions": "100 cm x 100 cm x 100 cm",
            "spacing_meters": "7.5m x 7.5m (triangular or square system)",
            "soil_preparation": "Layer bottom of pit with 2 layers of coconut husks (concave side up) for water retention, fill with topsoil, 25 kg FYM, and 1 kg common salt.",
            "irrigation_schedule": "Water with 40-50 liters every 2-3 days in summer for saplings; basin irrigation once per week for mature palms.",
            "planting_season": "May-June (pre-monsoon) with 9-12 month old vigorous seedlings having 6-8 healthy green fronds.",
            "special_care": "Protect seedling bud from rhinoceros beetle and red palm weevil using pheromone traps and neem oil cake barrier."
        }
    },
    "Papaya": {
        "scientific_name": "Carica papaya",
        "family": "Caricaceae",
        "optimal_rainfall_mm": (800, 2000),
        "optimal_temp_c": (22, 38),
        "compatible_soils": ["Loamy", "Alluvial", "Sandy", "Red"],
        "min_sunlight_hours": 7.0,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Extremely Fast",
        "ecological_value": "Continuous commercial fruit yield, papain enzyme extraction, rapid commercial cash flow within 8 months.",
        "plantation_guidance": {
            "pit_dimensions": "50 cm x 50 cm x 50 cm on raised beds (30 cm height)",
            "spacing_meters": "1.8m x 1.8m or 2m x 2m (2500 plants/ha)",
            "soil_preparation": "Porous, well-draining soil mixed with 10 kg compost, 200g bone meal, and 100g neem cake. Absolutely avoid water stagnant soils.",
            "irrigation_schedule": "Light frequent drip irrigation. Never allow water to pool at the base of the stem to avoid collar rot (Pythium).",
            "planting_season": "June-July (monsoon) or February-March (spring) using dioecious or gynodioecious seedlings.",
            "special_care": "Remove extra male plants in dioecious varieties (maintain 1 male : 10 female ratio); ring weed around the root zone."
        }
    },
    "Pomegranate": {
        "scientific_name": "Punica granatum",
        "family": "Lythraceae",
        "optimal_rainfall_mm": (400, 1000),
        "optimal_temp_c": (20, 38),
        "compatible_soils": ["Loamy", "Sandy", "Red", "Alluvial", "Black"],
        "min_sunlight_hours": 8.0,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Moderate",
        "ecological_value": "High-value export fruit yield, antioxidant-rich arils, thrives in semi-arid and water-scarce terrains.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "4.5m x 3.0m (740 plants/ha) or 4m x 2.5m for intensive cultivation",
            "soil_preparation": "Mix soil with 20 kg FYM, 500g single superphosphate, and 1 kg neem cake. Ensure good gravelly drainage.",
            "irrigation_schedule": "Drip irrigation; requires regulated water stress (Bahar treatment) to time flowering and fruit set in dry seasons.",
            "planting_season": "Monsoon (July-August) with air-layered (goottee) or hardwood cutting saplings.",
            "special_care": "Train to multi-stem (3-4 main branches); bag fruit bunches with non-woven bags to prevent butterfly fruit borer damage."
        }
    },
    "Lemon": {
        "scientific_name": "Citrus limon",
        "family": "Rutaceae",
        "optimal_rainfall_mm": (600, 1500),
        "optimal_temp_c": (18, 35),
        "compatible_soils": ["Loamy", "Alluvial", "Sandy", "Red"],
        "min_sunlight_hours": 7.0,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Fast",
        "ecological_value": "Continuous year-round citrus fruit yield, high ascorbic acid and essential citrus oils, pollinator magnet.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "4m x 4m to 5m x 5m",
            "soil_preparation": "Well-aerated sandy loam with pH 6.0-7.5. Incorporate 15 kg manure and 200g micronutrient fertilizer mixture (zinc, boron, iron).",
            "irrigation_schedule": "Irrigate every 5-7 days in summer; keep soil moist but never soaked.",
            "planting_season": "June-August during the rainy season with healthy air-layered or grafted plants.",
            "special_care": "Prune water sprouts and dead twigs annually; spray copper oxychloride to prevent citrus canker and dieback."
        }
    },
    "Jackfruit": {
        "scientific_name": "Artocarpus heterophyllus",
        "family": "Moraceae",
        "optimal_rainfall_mm": (1000, 2600),
        "optimal_temp_c": (20, 36),
        "compatible_soils": ["Alluvial", "Loamy", "Red", "Clay"],
        "min_sunlight_hours": 6.0,
        "drought_tolerance": "Moderate",
        "waterlogging_tolerance": "Low",
        "growth_rate": "Moderate",
        "ecological_value": "World's largest edible tree fruit yield (up to 30 kg/fruit), valuable timber, highly drought-resilient once mature, climate superfood.",
        "plantation_guidance": {
            "pit_dimensions": "100 cm x 100 cm x 100 cm",
            "spacing_meters": "10m x 10m for standard orchards or 8m x 8m for grafted dwarf cultivars",
            "soil_preparation": "Deep, porous alluvial/loam soil enriched with 25 kg well-rotted cattle manure and 500g rock phosphate.",
            "irrigation_schedule": "Weekly watering for young saplings; highly resilient deep taproot once established.",
            "planting_season": "Onset of monsoon (June-July) with healthy grafted or seedling stock.",
            "special_care": "Fruit develops on the main trunk and primary branches (cauliflory); maintain clear trunk access and support heavy fruit loads."
        }
    },
    "Sapota": {
        "scientific_name": "Manilkara zapota",
        "family": "Sapotaceae",
        "optimal_rainfall_mm": (700, 1800),
        "optimal_temp_c": (20, 38),
        "compatible_soils": ["Alluvial", "Sandy", "Loamy", "Black", "Red"],
        "min_sunlight_hours": 6.5,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Moderate",
        "ecological_value": "High continuous annual sweet fruit yield (Chiku), coastal salinity tolerance, dense evergreen shade.",
        "plantation_guidance": {
            "pit_dimensions": "90 cm x 90 cm x 90 cm",
            "spacing_meters": "8m x 8m to 10m x 10m (100-150 plants/ha)",
            "soil_preparation": "Deep well-draining soil mixed with 20 kg compost, 1 kg bone meal, and 500g wood ash for potassium.",
            "irrigation_schedule": "Water every 8-10 days in summer; tolerates mild drought and brackish groundwater.",
            "planting_season": "Monsoon (July-September) using inarched or softwood grafted plants (e.g. Cricket Ball, Kalipatti).",
            "special_care": "Remove rootstock suckers appearing below the graft point; shelter young plants from strong desiccating winds."
        }
    },
    "Amla": {
        "scientific_name": "Phyllanthus emblica",
        "family": "Phyllanthaceae",
        "optimal_rainfall_mm": (400, 1400),
        "optimal_temp_c": (18, 42),
        "compatible_soils": ["Red", "Sandy", "Loamy", "Black", "Alluvial", "Clay"],
        "min_sunlight_hours": 7.5,
        "drought_tolerance": "High",
        "waterlogging_tolerance": "Moderate",
        "growth_rate": "Fast",
        "ecological_value": "Supreme medicinal & commercial fruit yield, extreme Vitamin C content, thrives on marginal sodic/alkaline soils where other crops fail.",
        "plantation_guidance": {
            "pit_dimensions": "60 cm x 60 cm x 60 cm",
            "spacing_meters": "6m x 6m (275 plants/ha) or 5m x 5m",
            "soil_preparation": "Tolerates alkaline/saline soils (pH up to 8.5). Mix pit with 15 kg FYM and 1 kg gypsum if soil is sodic.",
            "irrigation_schedule": "Irrigate every 10-14 days during summer months; dormant during peak dry period.",
            "planting_season": "July-August (monsoon) or February (spring) with budded or patch-budded saplings (e.g. NA-7, Krishna, Chakaiya).",
            "special_care": "Prune early to maintain 4-5 well-spaced scaffold limbs; mulching tree basins with straw significantly increases fruit retention."
        }
    }
}
