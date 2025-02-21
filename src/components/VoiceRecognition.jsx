import React, { useState, useEffect } from 'react';

const language = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [diagnosis, setDiagnosis] = useState('');
    const [location, setLocation] = useState('');
    const [medicalStores, setMedicalStores] = useState([]);
    
    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/location');
            const data = await response.json();
            setLocation(`${data.location.city}, ${data.location.country}`);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    const startListening = () => {
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setDiagnosis('');
        };

        recognition.onresult = async (event) => {
            const speechText = event.results[0][0].transcript;
            setTranscript(speechText);
            await fetchDiagnosis(speechText);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const fetchDiagnosis = async (symptoms) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/voice-diagnosis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });
            const data = await response.json();
            setDiagnosis(data.diagnosis || "No diagnosis found.");
        } catch (error) {
            console.error("Error fetching diagnosis:", error);
            setDiagnosis("Error fetching diagnosis. Please try again.");
        }
    };

    const fetchMedicalStores = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/medical_stores');
            const data = await response.json();
            setMedicalStores(data.stores || []);
        } catch (error) {
            console.error("Error fetching medical stores:", error);
        }
    };

    return (
        <div className="voice-container">
            <h2>Voice-Based Medical Assistant</h2>
            <button onClick={startListening} disabled={isListening}>
                {isListening ? 'Listening...' : 'Start Speaking'}
            </button>
            <p><strong>Transcript:</strong> {transcript}</p>
            <p><strong>Diagnosis:</strong> {diagnosis}</p>
            <p><strong>Location:</strong> {location}</p>
            <button onClick={fetchMedicalStores}>Find Nearby Medical Stores</button>
            <ul>
                {medicalStores.length > 0 ? (
                    medicalStores.map((store, index) => (
                        <li key={index}>{store}</li>
                    ))
                ) : (
                    <p>No medical stores found.</p>
                )}
            </ul>
        </div>
    );
};

export default language;