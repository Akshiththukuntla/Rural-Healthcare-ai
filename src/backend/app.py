from flask import Flask, request, jsonify
from flask_cors import CORS  # Enable CORS for frontend communication
import numpy as np
import random  # For generating chatbot responses
from models.kidney_model import predict_kidney
from models.liver_model import predict_liver
from models.heart_model import predict_heart
from models.diabetes_model import predict_diabetes
import pyaudio
import wave
import speech_recognition as sr
import requests
import geocoder

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow all frontend requests
MISTRAL_API_KEY = "6rzi1Dep2r6SFB7p1QKjRFff0mgMpCZZ"
mistral_url = "https://api.mistral.ai/v1/chat/completions"

# 📌 Home Route (Prevents 404 Errors)
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Health API! Available endpoints: /api/kidney, /api/liver, /api/heart, /api/diabetes, /api/chatbot"}), 200
@app.route('/api/kidney', methods=['POST'])
def kidney_diagnosis():
    try:
        data = request.json
        if not all(key in data for key in ['age', 'bp', 'sugar']):
            return jsonify({"error": "Missing required fields: age, bp, sugar"}), 400

        input_data = np.array([data['age'], data['bp'], data['sugar']]).reshape(1, -1)
        result = predict_kidney(input_data)
        return jsonify({"result": int(result), "disease": "kidney"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📌 Liver Disease Prediction
@app.route('/api/liver', methods=['POST'])
def liver_diagnosis():
    try:
        data = request.json
        if not all(key in data for key in ['age', 'sgpt', 'sgot']):
            return jsonify({"error": "Missing required fields: age, sgpt, sgot"}), 400

        input_data = np.array([data['age'], data['sgpt'], data['sgot']]).reshape(1, -1)
        result = predict_liver(input_data)
        return jsonify({"result": int(result), "disease": "liver"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📌 Heart Disease Prediction
@app.route('/api/heart', methods=['POST'])
def heart_diagnosis():
    try:
        data = request.json
        if not all(key in data for key in ['age', 'cholesterol', 'bp']):
            return jsonify({"error": "Missing required fields: age, cholesterol, bp"}), 400

        input_data = np.array([data['age'], data['cholesterol'], data['bp']]).reshape(1, -1)
        result = predict_heart(input_data)
        return jsonify({"result": int(result), "disease": "heart"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/process-speech', methods=['POST'])
def process_speech():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    audio_file.save('speech.wav')

    with wave.open('speech.wav', 'rb') as wf:
        audio_content = wf.readframes(wf.getnframes())
        audio = speech.RecognitionAudio(content=audio_content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code='en-US'
        )
        response = client.recognize(config=config, audio=audio)
        recognized_text = ' '.join([result.alternatives[0].transcript for result in response.results])

    mistral_payload = {
        "model": "mistral-small-latest",
        "temperature": 1.0,
        "top_p": 1,
        "max_tokens": 250,
        "stream": False,
        "messages": [{"role": "user", "content": f"My symptoms are: {recognized_text}. Suggest me medicines."}],
    }
    mistral_headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json",
    }

    mistral_response = requests.post(mistral_url, json=mistral_payload, headers=mistral_headers)
    if mistral_response.status_code == 200:
        ai_response = mistral_response.json()["choices"][0]["message"]["content"]
        return jsonify({'recognized_text': recognized_text, 'suggested_medicines': ai_response})
    else:
        return jsonify({'error': 'Error with Mistral API', 'details': mistral_response.json()}), 500


# 📌 Diabetes Prediction
@app.route('/api/diabetes', methods=['POST'])
def diabetes_diagnosis():
    try:
        data = request.json
        if not all(key in data for key in ['age', 'glucose', 'bmi']):
            return jsonify({"error": "Missing required fields: age, glucose, bmi"}), 400

        input_data = np.array([data['age'], data['glucose'], data['bmi']]).reshape(1, -1)
        result = predict_diabetes(input_data)
        return jsonify({"result": int(result), "disease": "diabetes"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📌 Chatbot Route
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.json
        user_message = data.get("message", "").lower()

        # Simple rule-based chatbot responses
        if "kidney" in user_message:
            reply = "For kidney health, drink plenty of water, avoid excessive salt, and manage your blood pressure."
        elif "heart" in user_message:
            reply = "For heart health, maintain a healthy diet, exercise regularly, and monitor your cholesterol levels."
        elif "liver" in user_message:
            reply = "For liver health, avoid alcohol, eat a balanced diet, and stay hydrated."
        elif "diabetes" in user_message:
            reply = "For diabetes management, maintain a healthy diet, exercise daily, and check your blood sugar levels."
        elif "exercise" in user_message:
            reply = "Regular physical activity, like walking or yoga, can help improve overall health."
        elif "diet" in user_message:
            reply = "A balanced diet rich in vegetables, fruits, and whole grains is beneficial for overall health."
        else:
            # Random generic responses
            responses = [
                "I'm here to help with your health concerns!",
                "Please provide details about your symptoms.",
                "I recommend consulting a doctor for further analysis.",
                "Stay hydrated and maintain a balanced diet!"
            ]
            reply = random.choice(responses)

        return jsonify({"reply": reply}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 

# 📌 Start the Flask App
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
