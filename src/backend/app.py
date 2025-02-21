from flask import Flask, request, jsonify
from flask_cors import CORS
import pyaudio
import wave
import speech_recognition as sr
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

MISTRAL_API_KEY = "6rzi1Dep2r6SFB7p1QKjRFff0mgMpCZZ"
mistral_url = "https://api.mistral.ai/v1/chat/completions"

recognized_text = ""  # Store recognized text globally

@app.route('/record', methods=['POST'])
def record_audio():
    global recognized_text
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100
    CHUNK = 1024
    RECORD_SECONDS = 5
    OUTPUT_FILENAME = "speech.wav"

    audio = pyaudio.PyAudio()
    stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

    frames = [stream.read(CHUNK) for _ in range(0, int(RATE / CHUNK * RECORD_SECONDS))]

    stream.stop_stream()
    stream.close()
    audio.terminate()

    with wave.open(OUTPUT_FILENAME, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

    recognizer = sr.Recognizer()
    with sr.AudioFile(OUTPUT_FILENAME) as source:
        recognizer.adjust_for_ambient_noise(source)
        audio_data = recognizer.record(source)

    try:
        recognized_text = recognizer.recognize_google(audio_data, language="en-US")
    except sr.UnknownValueError:
        recognized_text = "Could not understand the speech."
    except sr.RequestError as e:
        recognized_text = f"Error connecting to speech recognition service: {e}"

    return jsonify({"message": "Recording Complete", "text": recognized_text})

@app.route('/process', methods=['POST'])
def process_text():
    global recognized_text
    if not recognized_text:
        return jsonify({"error": "No speech recognized."})

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

    response = requests.post(mistral_url, json=mistral_payload, headers=mistral_headers)

    if response.status_code == 200:
        ai_response = response.json().get("choices", [{}])[0].get("message", {}).get("content", "No response received.")
        return jsonify({"medicines": ai_response})
    else:
        return jsonify({"error": "Error with Mistral API", "details": response.text})

if __name__ == "__main__":
    app.run(debug=True)
