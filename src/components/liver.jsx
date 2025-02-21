import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Liver = ({ setResult }) => {
    const [formData, setFormData] = useState({});
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/liver', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setResult(data);
            navigate("/result");

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <h2>Liver Disease Diagnosis</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="age" placeholder="Age" onChange={handleChange} />
                <input type="text" name="sgpt" placeholder="SGPT" onChange={handleChange} />
                <input type="text" name="sgot" placeholder="SGOT" onChange={handleChange} />
                <button type="submit">Diagnose</button>
            </form>
        </div>
    );
};
