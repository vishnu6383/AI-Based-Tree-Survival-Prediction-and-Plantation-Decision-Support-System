# AI-Based Tree Survival Prediction and Plantation Decision Support System

> **An End-to-End Decision-Support System for Microclimate-Aware Afforestation and Agroforestry Planning**

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4%2B-F7931E.svg)](https://scikit-learn.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Supported-47A248.svg)](https://www.mongodb.com/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717.svg)](https://github.com/vishnu6383/AI-Based-Tree-Survival-Prediction-and-Plantation-Decision-Support-System.git)

---

## 1. Project Overview & Problem Statement

Millions of saplings planted annually during afforestation, municipal urban greening, and commercial agroforestry initiatives fail to survive due to plantation decisions that do not account for critical environmental factors:
- Rainfall deficits or over-saturation
- Ambient thermal fluctuations
- Incompatible soil taxonomy classification
- Inadequate or excessive soil moisture levels
- Sunlight exposure deficits
- Water availability / local water table constraints

This project solves this challenge by delivering a full-stack, AI-powered **Decision Support System (DSS)**. The system pairs a trained **scikit-learn Random Forest Classifier** with botanical compatibility rules to:
1. Predict the **survival probability** and **risk classification** for a selected tree species.
2. Rank **all 10 candidate species** under any custom microclimate and recommend the **Top 3 optimal matches**.
3. Provide practical **botanical plantation protocols** (pit excavation dimensions, spacing, soil preparation, irrigation schedules, and seasonal protection).
4. Explore comprehensive **botanical profiles** for all candidate species in the interactive Species Catalog.
5. Persistently audit and store all prediction runs in **MongoDB** (with automatic resilient local JSON fallback).

---

## 2. System Architecture

```text
                                 USER
                                  │
                                  ▼
                    React.js Web Application (Vite)
                     [Interactive Climate Dashboard]
                                  │
                                  ▼ (HTTP REST / JSON)
                     FastAPI Backend Service
                                  │
                                  ▼
                 Data Preprocessing Pipeline
          [StandardScaler + OneHotEncoder (ColumnTransformer)]
                                  │
                                  ▼
                  Random Forest Ensemble Model
                  [predict_proba Calibrated Inference]
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
      Survival Probability (%)              Multi-Species Ranking
                 │                                 │
                 ▼                                 ▼
         Risk Level Classification            Top 3 Species Picks
                 └────────────────┬────────────────┘
                                  ▼
                    Botanical Rule Compatibility &
                     Plantation Guidance Generator
                                  │
                                  ▼
                     MongoDB Database Collection
                     (Resilient Local JSON Fallback)
```

---

## 3. Dataset Specification

The project uses a structured **12,000-row synthetic training dataset** modeling realistic botanical and climatic dynamics:
- **`backend/data/tree_survival_training_dataset_12000.csv`**
- **`backend/data/tree_survival_training_dataset_12000.xlsx`**

### Feature Dictionary

| Feature Name | Type | Description / Domain Range | Example |
| :--- | :--- | :--- | :--- |
| `rainfall_mm` | Continuous (Float) | Annual or seasonal rainfall (200 – 3500 mm) | `1200.0` |
| `temperature_c` | Continuous (Float) | Average ambient temperature (10 – 48 °C) | `28.5` |
| `soil_type` | Categorical (String) | `Red`, `Black`, `Loamy`, `Sandy`, `Clay`, `Alluvial` | `Loamy` |
| `soil_moisture_percent`| Continuous (Float) | Estimated soil moisture saturation (5 – 95%) | `45.0` |
| `sunlight_hours` | Continuous (Float) | Daily sunlight exposure hours (3 – 12 hrs) | `7.5` |
| `water_availability` | Categorical (String) | Local water table tier: `Low`, `Medium`, `High` | `Medium` |
| `tree_species` | Categorical (String) | 10 Candidate Species (Neem, Teak, Banyan, etc.) | `Neem` |
| `survival_probability_generated` | Float (Audit) | **EXCLUDED from model training** (audit-only) | `0.7850` |
| **`survival`** | **Binary Target (Int)** | **`1` = Survived / Suitable**, **`0` = Unsuitable** | `1` |

> [!IMPORTANT]
> **Data Leakage Prevention**: `survival_probability_generated` is solely an audit column and is strictly excluded from feature matrix $X$ prior to model fitting.

---

## 4. Machine Learning Pipeline & Model Evaluation

- **Preprocessing**: `ColumnTransformer` applying `StandardScaler()` to numerical inputs and `OneHotEncoder(handle_unknown='ignore')` to categorical fields.
- **Model**: `RandomForestClassifier(n_estimators=100, random_state=42)`
- **Data Splitting**: Stratified 80/20 train/test split (`stratify=y`).
- **Inference**: Probability estimation using `predict_proba`.

### Evaluation Metrics Summary (Test Split: 2,400 samples)

| Metric | Score | Notes |
| :--- | :--- | :--- |
| **Accuracy** | **86.00%** | Overall correct classifications |
| **Precision** | **87.44%** | Accuracy of positive survival predictions |
| **Recall (Sensitivity)** | **98.04%** | Successfully captures viable survival outcomes |
| **F1-Score** | **92.44%** | Harmonic mean of precision and recall |
| **ROC-AUC** | **0.6007** | Discriminative capacity across probability thresholds |

### Feature Importance Breakdown

1. `rainfall_mm` — **19.87%**
2. `temperature_c` — **19.39%**
3. `soil_moisture_percent` — **17.46%**
4. `sunlight_hours` — **16.77%**
5. `tree_species_Peepal` — **2.11%**
6. `soil_type_Clay` — **1.65%**
7. `tree_species_Banyan` — **1.60%**

---

## 5. Candidate Tree Species Catalog (10 Species)

1. **Neem** (*Azadirachta indica*) – High drought resilience, bio-pesticide, soil enricher.
2. **Teak** (*Tectona grandis*) – High timber value, prefers deep alluvial/loam substrates.
3. **Banyan** (*Ficus benghalensis*) – Keystone biodiversity host, massive canopy, resilient.
4. **Peepal** (*Ficus religiosa*) – High oxygen output, adapts across rocky and alluvial soils.
5. **Eucalyptus** (*Eucalyptus globulus*) – Fast growth, biomass production, windbreak.
6. **Sal** (*Shorea robusta*) – Climax forest timber, prefers moist sub-acidic loams.
7. **Gulmohar** (*Delonix regia*) – Ornamental landscape tree, flowering canopy, fast grower.
8. **Bamboo** (*Bambusa balcooa*) – Maximum carbon capture, soil erosion & riverbank stabilizer.
9. **Mango** (*Mangifera indica*) – Fruit yield, dense microclimate shade, prefers deep loam.
10. **Mahogany** (*Swietenia macrophylla*) – Elite commercial timber, thrives in humid zones.

---

## 6. Project Directory Structure

```text
tree-survival-system/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entrypoint & middleware
│   │   ├── config.py            # Environment configuration & risk thresholds
│   │   ├── schemas.py           # Pydantic validation schemas
│   │   ├── database.py          # MongoDB / Local JSON fallback manager
│   │   ├── routes/
│   │   │   ├── health.py        # Health check & metrics API
│   │   │   ├── predict.py       # Single-species survival prediction API
│   │   │   ├── recommend.py     # Multi-species ranking & recommendation API
│   │   │   └── history.py       # Prediction history storage and retrieval API
│   │   ├── services/
│   │   │   ├── ml_service.py    # Pipeline loader & inference engine
│   │   │   └── recommendation_service.py # Species ranking service
│   │   └── ml/
│   │       ├── species_data.py  # Botanical database & plantation protocols
│   │       └── rules.py         # Transparent ecological reasoning engine
│   ├── data/
│   │   ├── generate_dataset.py  # 12,000 row synthetic dataset generator
│   │   ├── tree_survival_training_dataset_12000.csv
│   │   └── tree_survival_training_dataset_12000.xlsx
│   ├── model/
│   │   ├── tree_survival_random_forest.joblib  # Trained pipeline
│   │   ├── model_metrics.json                  # Test evaluation report
│   │   └── feature_importance.json             # Feature weights
│   ├── train_model.py           # Model training and artifact export script
│   ├── evaluate_model.py        # Standalone model validation script
│   ├── test_api.py              # Automated 6-endpoint test suite
│   ├── requirements.txt         # Python backend dependencies
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation header with live status
│   │   │   ├── Footer.jsx       # Architecture credits
│   │   │   ├── StatusBadge.jsx  # Risk & viability badge
│   │   │   ├── RadialGauge.jsx  # Animated circular progress meter
│   │   │   ├── SpeciesCard.jsx  # Recommendation cards with progress bars
│   │   │   └── PlantationGuideModal.jsx # Pit, spacing & care protocol modal
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Hero, problem statement, presets
│   │   │   ├── PredictDashboard.jsx # Environmental input form & result view
│   │   │   ├── SpeciesExplorer.jsx  # Botanical catalog & search
│   │   │   ├── HistoryPage.jsx  # Filterable database audit table & CSV export
│   │   │   └── MethodologyPage.jsx  # ML metrics, feature importance, Viva guide
│   │   ├── services/
│   │   │   └── api.js           # REST API client
│   │   ├── App.jsx              # Main React controller
│   │   └── index.css            # Custom responsive eco-design styling
│   ├── package.json
│   └── vite.config.js
├── README.md
└── package.json
```

---

## 7. Step-by-Step Setup & Execution

### Prerequisites
- **Python 3.10+**
- **Node.js 18+ & npm**
- *(Optional)* **MongoDB** running on `mongodb://localhost:27017` *(If not running, the application automatically uses persistent local JSON storage fallback without any error!)*

---

### Step 1: Backend Setup & Model Training

```bash
# 1. Navigate to project root
cd c:\Users\vishn\OneDrive\Desktop\evs

# 2. Install backend Python dependencies
pip install -r backend/requirements.txt

# 3. Train the Random Forest model (also generates dataset if needed)
python backend/train_model.py

# 4. Verify API test suite
python backend/test_api.py
```

### Step 2: Start FastAPI Backend Server

```bash
# Start FastAPI backend with hot-reload
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API Root: `http://localhost:8000`
- Interactive Swagger UI Docs: `http://localhost:8000/docs`
- Redoc API Docs: `http://localhost:8000/redoc`

---

### Step 3: Frontend Setup & Execution

```bash
# Open a new terminal tab and navigate to frontend
cd frontend

# Install dependencies (if not already installed)
npm install

# Start Vite Development Server
npm run dev
```
- Open browser at: **`http://localhost:5173`**

---

## 8. REST API Documentation & Examples

### 1. `POST /predict`
Predicts survival probability and risk classification for a single species.

**Request Body:**
```json
{
  "rainfall_mm": 1150.0,
  "temperature_c": 29.0,
  "soil_type": "Loamy",
  "soil_moisture_percent": 48.0,
  "sunlight_hours": 7.5,
  "water_availability": "Medium",
  "tree_species": "Neem"
}
```

**Response (200 OK):**
```json
{
  "tree_species": "Neem",
  "scientific_name": "Azadirachta indica",
  "survival_probability": 0.6772,
  "survival_percentage": 67.7,
  "survival_prediction": 1,
  "status": "Moderate Viability",
  "risk_level": "Medium Risk",
  "recommendation_reason": "The Random Forest model estimated a 67.7% survival viability (Medium Risk). Excellent ecological match: rainfall, Loamy soil, and thermal parameters align closely with Neem's native envelope.",
  "input_summary": { ... },
  "plantation_guidance": {
    "pit_dimensions": "45 cm x 45 cm x 45 cm",
    "spacing_meters": "5m x 5m for agroforestry; 3m x 3m for boundary planting",
    "soil_preparation": "Mix native soil with 5 kg well-rotted farmyard manure (FYM)...",
    "irrigation_schedule": "Water twice weekly for first 3 months...",
    "planting_season": "Onset of monsoon (June-July)...",
    "special_care": "Protect young saplings from livestock grazing..."
  },
  "rule_breakdown": {
    "strengths": [
      "Loamy soil is well-suited for Neem's root architecture.",
      "Rainfall (1150 mm) is within optimal range (400-1200 mm)."
    ],
    "warnings": [],
    "overall_compatibility": "High"
  },
  "academic_notice": "Notice: This prediction is generated by an academic Random Forest decision-support system..."
}
```

---

### 2. `POST /recommend`
Ranks all 10 candidate species and returns top 3 optimal species.

**Request Body:**
```json
{
  "rainfall_mm": 1400.0,
  "temperature_c": 26.0,
  "soil_type": "Alluvial",
  "soil_moisture_percent": 60.0,
  "sunlight_hours": 7.0,
  "water_availability": "High"
}
```

---

### 3. `POST /predictions` (Save Record) & `GET /predictions` (History)
Stores and retrieves historical predictions from MongoDB / Local JSON fallback.

---

## 9. Viva Voce & Demonstration Explanations

1. **How does the system work end-to-end?**
   - Environmental inputs $\to$ Preprocessing Pipeline (`StandardScaler` + `OneHotEncoder`) $\to$ Random Forest Classifier $\to$ Survival Probability (`predict_proba`) $\to$ Risk Classification $\to$ Species Multi-Ranking $\to$ Plantation Care Protocol $\to$ MongoDB History Logging.

2. **Why Random Forest?**
   - Combines multiple de-correlated decision trees trained via bootstrap aggregation (bagging).
   - Robust against overfitting on tabular microclimate boundaries.
   - Provides clear feature importance extraction.

3. **What is the decision-support layer?**
   - Traditional ML systems return only 0 or 1.
   - Our system computes calibrated probabilities, ranks alternative candidate species, and outputs concrete agronomic guidelines (pit excavation, spacing, irrigation intervals).

---

## 10. Limitations & Future Scope

- **Limitation**: The 12,000-sample dataset is synthetic, designed for academic prototyping and decision-support modeling.
- **Future Work**: Integration with Sentinel-2 satellite imagery for Normalized Difference Vegetation Index (NDVI) monitoring, IoT soil sensor hardware integrations, and GPS-driven automatic climate telemetry fetching.

---

## 11. License
Academic Open-Source Prototype for Educational and Demonstration Purposes.
