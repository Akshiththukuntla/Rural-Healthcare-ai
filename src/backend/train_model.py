import os
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "datasets")
def train_and_save_model(filename, target_column, model_name, features=None):
    dataset_path = os.path.join(DATASET_DIR, filename)
    print(f"Loading dataset: {dataset_path}")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found: {dataset_path}")
    df = pd.read_csv(dataset_path)
    df = df.dropna()
    for col in df.columns:
        if df[col].dtype == 'object':
            df[col] = LabelEncoder().fit_transform(df[col])
    if features:
        X = df[features]
    else:
        X = df.drop(columns=[target_column])
    y = df[target_column]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    model_path = os.path.join(BASE_DIR, "models", f"{model_name}.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    print(f"✅ Model saved: {model_path}")
train_and_save_model("kidney_disease.csv", "classification", "kidney_model", features=["age", "bp", "sg"])
train_and_save_model("liver_disease.csv", "Dataset", "liver_model", features=["Age", "Total_Bilirubin", "SGPT"])
train_and_save_model("heart_disease.csv", "target", "heart_model", features=["age", "chol", "trestbps"])
train_and_save_model("diabetes.csv", "Outcome", "diabetes_model", features=["Age", "Glucose", "BMI"])
