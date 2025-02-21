import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Kidney = ({ setResult }) => {
    const [formData, setFormData] = useState({ age: "", bp: "", sugar: "" });
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/kidney', { // Fixed API URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    age: parseFloat(formData.age),
                    bp: parseFloat(formData.bp),
                    sugar: parseFloat(formData.sugar),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch results. Please try again.");
            }

            const data = await response.json();
            setResult(data);
            navigate("/result");

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while diagnosing. Please try again later.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-center text-2xl font-bold mb-4">Kidney Disease Diagnosis</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
                <div className="mb-4">
                    <label className="block font-medium">Age:</label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Blood Pressure:</label>
                    <input
                        type="number"
                        name="bp"
                        placeholder="Enter blood pressure"
                        value={formData.bp}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Sugar Level:</label>
                    <input
                        type="number"
                        name="sugar"
                        placeholder="Enter sugar level"
                        value={formData.sugar}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                    Diagnose
                </button>
            </form>
        </div>
    );
};
