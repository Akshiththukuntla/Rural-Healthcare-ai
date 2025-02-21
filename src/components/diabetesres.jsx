import React from 'react';
import { Link } from 'react-router-dom';

export const DiabetesRes = ({ result }) => {
    console.log("Diabetes Result Data:", result); // Debugging

    if (!result) {
        return <h1 className="text-center text-xl text-red-600">No data available!</h1>;
    }

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                        {
                            result.result === 1 ? (
                                <h1 className="text-2xl font-medium text-red-600">
                                    Diabetes Detected!
                                </h1>
                            ) : (
                                <h1 className="text-2xl font-medium text-green-500">
                                    No Diabetes Detected!
                                </h1>
                            )
                        }
                        <Link to="/diabetes" className="text-white bg-indigo-500 py-2 px-8 rounded-lg hover:bg-indigo-600">
                            Test Again
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};
