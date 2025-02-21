import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Diabetes = ({ setResult }) => {
    const [formData, setFormData] = useState({});
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/diabetes', { // Ensure Flask URL
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
        <div className="container mx-auto p-6 max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Diabetes Diagnosis</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Age:</label>
                <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Glucose Level:</label>
                <input
                    type="text"
                    name="glucose"
                    placeholder="Enter glucose level"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">BMI:</label>
                <input
                    type="text"
                    name="bmi"
                    placeholder="Enter BMI"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
                Diagnose
            </button>
        </form>
    </div>
    
    );
};
