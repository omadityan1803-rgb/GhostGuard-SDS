import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
import joblib
import json

FEATURES = [
    'mouse_entropy', 'mouse_avg_speed', 'mouse_direction_changes',
    'mouse_straight_line_ratio', 'mouse_pause_count',
    'key_avg_dwell', 'key_avg_flight', 'key_rhythm_consistency',
    'key_backspace_ratio', 'key_typing_speed',
    'scroll_depth', 'scroll_avg_speed', 'scroll_direction_changes',
    'scroll_reading_pattern', 'session_duration', 'request_timing_variance'
]

def train():
    df = pd.read_csv('ml/training_data.csv')
    X = df[FEATURES].fillna(0)
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, 
                                                           stratify=y, random_state=42)

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled  = scaler.transform(X_test)

    # Train XGBoost
    model = xgb.XGBClassifier(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        use_label_encoder=False,
        eval_metric='logloss',
        random_state=42
    )
    model.fit(X_train_scaled, y_train,
              eval_set=[(X_test_scaled, y_test)],
              verbose=50)

    # Evaluate
    y_pred = model.predict(X_test_scaled)
    y_prob = model.predict_proba(X_test_scaled)[:, 1]
    print(classification_report(y_test, y_pred))
    print(f"ROC-AUC: {roc_auc_score(y_test, y_prob):.4f}")

    # Save artifacts
    joblib.dump(model, 'backend/app/ml/model.pkl')
    joblib.dump(scaler, 'backend/app/ml/scaler.pkl')
    
    with open('backend/app/ml/features.json', 'w') as f:
        json.dump(FEATURES, f)

    print("Model saved to backend/app/ml/")

if __name__ == '__main__':
    train()
