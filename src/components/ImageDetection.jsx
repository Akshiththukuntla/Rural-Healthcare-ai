import React, { useState } from 'react';
import { Upload, Image as ImageIcon, ThermometerSun, List, Stethoscope } from 'lucide-react';
//import { analyzeSkinImage } from '../backend/imagemodel';

export default function SkinDiseaseDetector() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [results, setResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    setError(null);

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedImage(reader.result);
        setIsAnalyzing(true);
        try {
          const analysisResults = await analyzeSkinImage(reader.result);
          setResults(analysisResults);
        } catch (err) {
          setError("Error analyzing image. Please try again.");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Skin Condition Analysis</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a clear, well-lit image of the affected skin area for AI-powered analysis. 
          Our advanced machine learning model will analyze the image and provide potential diagnoses.
        </p>
      </div>

      <div className="mb-8">
        <label 
          htmlFor="image-upload"
          className="block w-full p-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
        >
          <div className="flex flex-col items-center">
            <Upload className="w-16 h-16 text-gray-400 mb-4" />
            <span className="text-lg text-gray-600 font-medium">Drop your image here or click to upload</span>
            <span className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</span>
          </div>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ImageIcon className="w-6 h-6 mr-2 text-blue-600" />
              Uploaded Image
            </h2>
            <img
              src={selectedImage}
              alt="Uploaded skin condition"
              className="w-full h-80 object-cover rounded-lg shadow-inner"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Stethoscope className="w-6 h-6 mr-2 text-blue-600" />
              AI Analysis Results
            </h2>
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-80 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                <p className="text-gray-600">Analyzing image with AI model...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-800">{result.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{result.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {result.confidence}% confidence
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full capitalize ${getSeverityColor(result.severity)}`}>
                          {result.severity}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <ThermometerSun className="w-4 h-4 mr-2" />
                          <span className="font-medium">Symptoms</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 pl-6">
                          {result.symptoms.map((symptom, idx) => (
                            <li key={idx}>{symptom}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <List className="w-4 h-4 mr-2" />
                          <span className="font-medium">Recommendations</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 pl-6">
                          {result.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
                    Please consult a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}