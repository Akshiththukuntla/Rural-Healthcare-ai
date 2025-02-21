import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";

const StressDetection = () => {
    const webcamRef = useRef(null);
    const [stressLevel, setStressLevel] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await blazeface.load();
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    useEffect(() => {
        const detectStressContinuously = async () => {
            if (webcamRef.current && model) {
                await analyzeFace();
                requestAnimationFrame(detectStressContinuously);
            }
        };
        if (model) detectStressContinuously();
    }, [model]);

    const analyzeFace = async () => {
        if (!model) return;

        const video = webcamRef.current.video;
        if (video.readyState === 4) {
            const predictions = await model.estimateFaces(video, false);
            if (predictions.length > 0) {
                const face = predictions[0];
                const stressScore = classifyStress(face);
                setStressLevel(stressScore);
            } else {
                setStressLevel("No face detected");
            }
        }
    };

    const classifyStress = (face) => {
        const { topLeft, bottomRight } = face;
        const faceWidth = bottomRight[0] - topLeft[0];

        return faceWidth < 100 ? "High Stress 😟" : "Low Stress 😊";
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">Stress Detection</h1>

            <Webcam
                ref={webcamRef}
                className="rounded-lg shadow-lg"
                videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
            />

            {stressLevel && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Stress Level: {stressLevel}</h2>
                </div>
            )}
        </div>
    );
};

export default StressDetection;