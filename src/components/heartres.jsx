import React from 'react';
import { Link } from 'react-router-dom';

export const HeartRes = ({ result }) => {
    console.log("Heart Result Data:", result); // Debugging

    if (!result) {
        return <h1 className="text-center text-xl text-red-600">No data available!</h1>;
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto p-6 bg-white shadow-md rounded-lg">
                    <div className="flex-grow sm:pr-16 text-center">
                        {result.result === 1 ? (
                            <h1 className="text-2xl font-medium text-red-600">
                                Heart Disease Detected! Please consult a doctor.
                            </h1>
                        ) : (
                            <h1 className="text-2xl font-medium text-green-500">
                                No Heart Disease Detected! You are healthy.
                            </h1>
                        )}
                    </div>

                    <Link 
                        to="/heart" 
                        className="text-white bg-indigo-500 py-2 px-8 rounded-lg hover:bg-indigo-600 transition"
                    >
                        Test Again
                    </Link>
                </div>
            </div>
        </section>
    );
};
