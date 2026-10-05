"""
Standalone Model Evaluation Script
===================================
Loads the persisted model pipeline and generates complete validation reports,
confusion matrices, and precision-recall trade-offs.
"""

import os
import json
import joblib
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, accuracy_score

def evaluate_saved_model():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "model", "tree_survival_random_forest.joblib")
    data_path = os.path.join(base_dir, "data", "tree_survival_training_dataset_12000.csv")

    if not os.path.exists(model_path):
        print(f"Trained model not found at {model_path}. Please run train_model.py first.")
        return

    print("Loading model pipeline...")
    pipeline = joblib.load(model_path)

    df = pd.read_csv(data_path)
    X = df.drop(columns=["survival", "survival_probability_generated"], errors="ignore")
    y = df["survival"]

    y_pred = pipeline.predict(X)
    y_proba = pipeline.predict_proba(X)[:, 1]

    acc = accuracy_score(y, y_pred)
    roc_auc = roc_auc_score(y, y_proba)
    cm = confusion_matrix(y, y_pred)

    print("\n================ FULL DATASET EVALUATION ================")
    print(f"Dataset Size : {len(df)} samples")
    print(f"Accuracy     : {acc * 100:.2f}%")
    print(f"ROC-AUC      : {roc_auc:.4f}")
    print("\nConfusion Matrix:")
    print(cm)
    print("\nClassification Report:")
    print(classification_report(y, y_pred, digits=4))
    print("=========================================================\n")

if __name__ == "__main__":
    evaluate_saved_model()
