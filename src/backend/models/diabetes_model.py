import os
import pickle
import numpy as np
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "diabetes_model.pkl")
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)
def predict_diabetes(input_data):
    input_array = np.array(input_data).reshape(1, -1)
    return model.predict(input_array)[0]
