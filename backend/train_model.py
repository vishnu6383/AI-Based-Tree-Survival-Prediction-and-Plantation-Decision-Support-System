"""
Tree Survival Model Training Pipeline
======================================
Trains a scikit-learn RandomForestClassifier with a robust ColumnTransformer + Pipeline.
Evaluates accuracy, precision, recall, F1, ROC-AUC, and feature importances.
Saves the artifact to `model/tree_survival_random_forest.joblib`.
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)

def train_and_evaluate():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, "data", "tree_survival_training_dataset_12000.csv")
    model_dir = os.path.join(base_dir, "model")
    os.makedirs(model_dir, exist_ok=True)

    print("==========================================================")
    print("AI-Based Tree Survival Model Training Pipeline")
    print("==========================================================")

    # 1. Load Dataset
    if not os.path.exists(data_path):
        print(f"Dataset not found at {data_path}. Running generator first...")
        from data.generate_dataset import generate_dataset
        data_path = generate_dataset()

    df = pd.read_csv(data_path)
    print(f"Loaded dataset successfully with {len(df)} records.")
    print("Columns:", list(df.columns))

    # 2. Data Validation
    missing_count = df.isnull().sum().sum()
    duplicate_count = df.duplicated().sum()
    print(f"Missing values: {missing_count} | Duplicate rows: {duplicate_count}")

    # 3. Features & Target separation (CRITICAL: exclude survival_probability_generated)
    target_col = "survival"
    audit_col = "survival_probability_generated"

    if audit_col in df.columns:
        print(f"Excluding audit field '{audit_col}' from model features to prevent leakage.")
        X = df.drop(columns=[target_col, audit_col])
    else:
        X = df.drop(columns=[target_col])

    y = df[target_col]

    print(f"Target distribution:\n{y.value_counts(normalize=True)}")

    num_features = ["rainfall_mm", "temperature_c", "soil_moisture_percent", "sunlight_hours"]
    cat_features = ["soil_type", "water_availability", "tree_species"]

    print(f"Numerical features: {num_features}")
    print(f"Categorical features: {cat_features}")

    # 4. Preprocessing Pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), num_features),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), cat_features)
        ],
        remainder="drop"
    )

    # 5. Full Pipeline with Random Forest Classifier
    rf_classifier = RandomForestClassifier(
        n_estimators=150,
        max_depth=16,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1
    )

    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", rf_classifier)
    ])

    # 6. Stratified Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"Training samples: {len(X_train)} | Testing samples: {len(X_test)}")

    # 7. Fit Pipeline
    print("Fitting Random Forest pipeline...")
    pipeline.fit(X_train, y_train)

    # 8. Evaluation on Test Set
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    roc_auc = roc_auc_score(y_test, y_proba)
    cm = confusion_matrix(y_test, y_pred).tolist()

    print("\n----------------- TEST SET EVALUATION -----------------")
    print(f"Accuracy : {acc * 100:.2f}%")
    print(f"Precision: {prec * 100:.2f}%")
    print(f"Recall   : {rec * 100:.2f}%")
    print(f"F1-Score : {f1 * 100:.2f}%")
    print(f"ROC-AUC  : {roc_auc:.4f}")
    print("\nConfusion Matrix:")
    print(np.array(cm))
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, digits=4))

    # 9. Extract Feature Importance
    try:
        cat_encoder = pipeline.named_steps["preprocessor"].named_transformers_["cat"]
        encoded_cat_names = list(cat_encoder.get_feature_names_out(cat_features))
        all_feature_names = num_features + encoded_cat_names
        importances = pipeline.named_steps["classifier"].feature_importances_

        feature_importance_list = [
            {"feature": name, "importance": round(float(imp), 4)}
            for name, imp in sorted(zip(all_feature_names, importances), key=lambda x: x[1], reverse=True)
        ]
        
        feat_imp_path = os.path.join(model_dir, "feature_importance.json")
        with open(feat_imp_path, "w") as f:
            json.dump(feature_importance_list, f, indent=2)
        print(f"Top 5 most important features:")
        for item in feature_importance_list[:5]:
            print(f"  - {item['feature']}: {item['importance']:.4f}")
    except Exception as e:
        print(f"Warning: Could not extract feature importances: {e}")
        feature_importance_list = []

    # 10. Save Metrics Summary
    metrics_summary = {
        "accuracy": round(float(acc), 4),
        "precision": round(float(prec), 4),
        "recall": round(float(rec), 4),
        "f1_score": round(float(f1), 4),
        "roc_auc": round(float(roc_auc), 4),
        "confusion_matrix": {
            "true_negative": cm[0][0],
            "false_positive": cm[0][1],
            "false_negative": cm[1][0],
            "true_positive": cm[1][1]
        },
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "total_dataset_rows": len(df),
        "synthetic_notice": "Academic prototype trained on 12,000 synthetic environmental variation samples. Real-world deployment requires field calibration."
    }

    metrics_path = os.path.join(model_dir, "model_metrics.json")
    with open(metrics_path, "w") as f:
        json.dump(metrics_summary, f, indent=2)

    # 11. Save Trained Pipeline to Joblib
    model_save_path = os.path.join(model_dir, "tree_survival_random_forest.joblib")
    joblib.dump(pipeline, model_save_path)
    print(f"\nModel pipeline successfully saved to: {model_save_path}")
    print(f"Metrics saved to: {metrics_path}")
    print("==========================================================")

    return model_save_path, metrics_summary

if __name__ == "__main__":
    train_and_evaluate()
