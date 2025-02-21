    import React, { useState } from "react";

    const Language= () => {
        const [message, setMessage] = useState("");
        const [medicine, setMedicine] = useState("");
        const [loading, setLoading] = useState(false);

        const startRecording = async () => {
            setMessage("Recording started... Please speak your symptoms.");
            setLoading(true);
            setMedicine("");

            try {
                const recordResponse = await fetch("http://localhost:5000/record", { method: "POST" });
                const recordData = await recordResponse.json();
                setMessage("Processing speech...");

                const processResponse = await fetch("http://localhost:5000/process", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: recordData.text }),
                });
                
                const processData = await processResponse.json();
                setLoading(false);
                
                if (processData.medicines) {
                    setMedicine(`💊 Suggested Medicines: ${processData.medicines}`);
                } else {
                    setMedicine(`⚠️ Error: ${processData.error}`);
                }
            } catch (error) {
                setLoading(false);
                setMessage("An error occurred. Please try again.");
            }
        };

        return (
            <div style={styles.container}>
                <h1 style={styles.heading}>Voice-Based Medicine Suggestion</h1>
                <button style={styles.button} onClick={startRecording}>🎤 Start Recording</button>
                {loading && <div style={styles.loader}></div>}
                <p style={styles.status}>{message}</p>
                <p style={styles.status}>{medicine}</p>
            </div>
        );
    };

    const styles = {
        container: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
        },
        heading: { color: "#333" },
        button: {
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "15px 20px",
            fontSize: "18px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s",
        },
        loader: {
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            animation: "spin 1s linear infinite",
            margin: "10px auto",
        },
        status: { marginTop: "20px", fontSize: "16px", color: "#555" },
    };

    export default Language;
