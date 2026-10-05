"""
End-to-End API Test Suite
=========================
Verifies all FastAPI endpoints:
- GET /health
- POST /predict
- POST /recommend
- POST /predictions
- GET /predictions
- GET /metrics
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def run_tests():
    print("==================================================")
    print("RUNNING END-TO-END API TESTS")
    print("==================================================")

    # 1. Health Endpoint
    print("\n1. Testing GET /health...")
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    health_data = res.json()
    print(f"-> Status: {health_data['status']}")
    print(f"-> Model Loaded: {health_data['model_loaded']}")
    print(f"-> Database Mode: {health_data['database_mode']}")

    # 2. Metrics Endpoint
    print("\n2. Testing GET /metrics...")
    res = client.get("/metrics")
    assert res.status_code == 200, f"Metrics fetch failed: {res.text}"
    metrics_data = res.json()
    print(f"-> Accuracy: {metrics_data['metrics'].get('accuracy')}")
    print(f"-> Top Feature: {metrics_data['feature_importances'][0] if metrics_data['feature_importances'] else 'None'}")

    # 3. Predict Endpoint
    print("\n3. Testing POST /predict...")
    payload = {
        "rainfall_mm": 1100.0,
        "temperature_c": 28.5,
        "soil_type": "Loamy",
        "soil_moisture_percent": 45.0,
        "sunlight_hours": 7.5,
        "water_availability": "Medium",
        "tree_species": "Neem"
    }
    res = client.post("/predict", json=payload)
    assert res.status_code == 200, f"Predict failed: {res.text}"
    pred_data = res.json()
    print(f"-> Species: {pred_data['tree_species']}")
    print(f"-> Survival Probability: {pred_data['survival_probability']} ({pred_data['survival_percentage']}%)")
    print(f"-> Risk Level: {pred_data['risk_level']}")
    print(f"-> Status: {pred_data['status']}")
    print(f"-> Reason: {pred_data['recommendation_reason'][:80]}...")

    # 4. Recommend Endpoint
    print("\n4. Testing POST /recommend...")
    rec_payload = {
        "rainfall_mm": 1400.0,
        "temperature_c": 26.0,
        "soil_type": "Alluvial",
        "soil_moisture_percent": 60.0,
        "sunlight_hours": 7.0,
        "water_availability": "High"
    }
    res = client.post("/recommend", json=rec_payload)
    assert res.status_code == 200, f"Recommend failed: {res.text}"
    rec_data = res.json()
    print(f"-> Top 3 Recommendations:")
    for sp in rec_data['top_species']:
        print(f"   Rank #{sp['rank']} {sp['name']} - {sp['survival_percentage']}% ({sp['risk_level']})")

    # 5. Save Prediction Endpoint
    print("\n5. Testing POST /predictions...")
    save_payload = {
        "environmental_inputs": payload,
        "selected_species": "Neem",
        "survival_probability": pred_data['survival_probability'],
        "survival_percentage": pred_data['survival_percentage'],
        "prediction": pred_data['survival_prediction'],
        "status": pred_data['status'],
        "risk_level": pred_data['risk_level'],
        "recommended_species": [s['name'] for s in rec_data['top_species']],
        "recommendation_reason": pred_data['recommendation_reason']
    }
    res = client.post("/predictions", json=save_payload)
    assert res.status_code == 201, f"Save prediction failed: {res.text}"
    saved_res = res.json()
    print(f"-> Record Saved ID: {saved_res.get('id')}")

    # 6. Retrieve Prediction History
    print("\n6. Testing GET /predictions...")
    res = client.get("/predictions")
    assert res.status_code == 200, f"Get history failed: {res.text}"
    history_data = res.json()
    print(f"-> Stored Records Count: {len(history_data)}")
    assert len(history_data) >= 1, "Expected at least 1 record in history"

    print("\n==================================================")
    print("ALL 6 END-TO-END TESTS PASSED WITH 100% SUCCESS!")
    print("==================================================")

if __name__ == "__main__":
    run_tests()
