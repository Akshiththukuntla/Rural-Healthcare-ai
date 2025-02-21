import React from 'react';
import { KidneyRes } from '../components/kidneyres';
import { LiverRes } from '../components/liverres';
import { DiabetesRes } from '../components/diabetesres';
import { HeartRes } from '../components/heartres';

export const Result = ({ result }) => {
    console.log("Result Page Received:", result);
    return (
        <>
            {result ? (
                result.disease === 'kidney' ? 
                    <KidneyRes result={result} /> 
                    : result.disease === 'liver' ? 
                    <LiverRes result={result} /> 
                    : result.disease === 'diabetes' ? 
                    <DiabetesRes result={result} /> 
                    : result.disease === 'heart' ? 
                    <HeartRes result={result} />
                    : <h1 className="text-center text-xl text-red-600">No valid disease result!</h1>
            ) : (
                <h1 className="text-center text-xl text-red-600">No result available!</h1>
            )}
        </>
    );
};
