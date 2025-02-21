import React, { useState, useRef } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";

const diseaseDatabase = {
  acne: { 
    solutions: [
      "Wash face daily with a gentle cleanser",
      "Use oil-free and non-comedogenic skincare products",
      "Avoid touching your face frequently",
      "Apply benzoyl peroxide or salicylic acid",
      "Stay hydrated and maintain a healthy diet"
    ] 
  },
  eczema: { 
    solutions: [
      "Use fragrance-free moisturizers regularly",
      "Avoid hot showers and harsh soaps",
      "Apply prescribed corticosteroid creams",
      "Wear soft, breathable fabrics",
      "Identify and avoid potential triggers"
    ] 
  },
  psoriasis: { 
    solutions: [
      "Keep skin moisturized with thick creams",
      "Expose skin to moderate sunlight",
      "Use medicated shampoos for scalp psoriasis",
      "Manage stress with relaxation techniques",
      "Consult a dermatologist for advanced treatments"
    ] 
  },
  rosacea: { 
    solutions: [
      "Avoid triggers like spicy foods and alcohol",
      "Use gentle, fragrance-free skincare products",
      "Apply prescribed topical medications",
      "Protect your skin from extreme temperatures",
      "Consider laser therapy for persistent redness"
    ] 
  },
  melanoma: { 
    solutions: [
      "Seek immediate medical attention",
      "Regularly monitor skin changes and moles",
      "Use broad-spectrum sunscreen (SPF 30+)",
      "Avoid prolonged sun exposure and tanning beds",
      "Consult a dermatologist for professional evaluation"
    ] 
  },
  vitiligo: { 
    solutions: [
      "Protect skin from sun damage with sunscreen",
      "Consider phototherapy for pigment restoration",
      "Use prescribed topical corticosteroids",
      "Consult a dermatologist for treatment options",
      "Consider cosmetic camouflage makeup"
    ] 
  },
  dermatitis: { 
    solutions: [
      "Use fragrance-free and hypoallergenic skincare products",
      "Avoid known allergens and irritants",
      "Apply prescribed corticosteroid creams",
      "Keep skin moisturized to reduce irritation",
      "Wear protective gloves when dealing with harsh chemicals"
    ] 
  },
  fungal_infection: { 
    solutions: [
      "Keep the affected area clean and dry",
      "Use over-the-counter antifungal creams",
      "Avoid sharing towels, socks, and shoes",
      "Wear breathable, moisture-wicking fabrics",
      "Complete the full course of antifungal treatment"
    ] 
  },
  shingles: { 
    solutions: [
      "Seek immediate medical attention for antiviral medication",
      "Apply cool compresses to soothe the rash",
      "Avoid scratching to prevent secondary infections",
      "Take pain relievers for discomfort",
      "Ensure proper rest and hydration for faster recovery"
    ] 
  },
  impetigo: { 
    solutions: [
      "Use prescribed antibiotic ointments",
      "Wash affected areas gently with antiseptic soap",
      "Avoid touching or scratching the sores",
      "Change pillowcases and towels daily",
      "Prevent spread by washing hands frequently"
    ] 
  },
  cellulitis: { 
    solutions: [
      "Take prescribed antibiotics as directed",
      "Elevate the affected limb to reduce swelling",
      "Apply warm compresses for relief",
      "Monitor for fever or spreading redness",
      "Keep skin clean and moisturized"
    ] 
  },
  warts: { 
    solutions: [
      "Use over-the-counter wart removal treatments",
      "Consult a dermatologist for cryotherapy (freezing)",
      "Keep warts covered to prevent spreading",
      "Avoid picking or scratching warts",
      "Boost immune system with a healthy diet"
    ] 
  },
  seborrheic_dermatitis: { 
    solutions: [
      "Use medicated shampoos containing ketoconazole or selenium sulfide",
      "Apply antifungal or corticosteroid creams",
      "Manage stress levels as it can trigger flare-ups",
      "Avoid harsh or drying skincare products",
      "Wash hair and scalp regularly with mild shampoos"
    ] 
  },
  hives: { 
    solutions: [
      "Identify and avoid allergic triggers",
      "Take antihistamines to reduce itching and swelling",
      "Apply cool compresses to soothe irritated skin",
      "Wear loose-fitting, breathable clothing",
      "Keep a symptom diary to track potential triggers"
    ] 
  },
  lupus: { 
    solutions: [
      "Protect skin from excessive sun exposure",
      "Take prescribed medications to manage symptoms",
      "Monitor for new or worsening skin lesions",
      "Manage stress with relaxation techniques",
      "Schedule regular medical check-ups"
    ] 
  }
};

const ImageDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        analyzeSkin();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkin = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const diseases = Object.keys(diseaseDatabase);
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResult({ disease: randomDisease, confidence: Math.floor(Math.random() * 20 + 80) });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Skin Disease Detection</h1>
      <p className="text-gray-600 mb-6">Upload a photo of the affected skin area for analysis.</p>

      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500">Click to upload or drag and drop</p>
      </div>

      {selectedImage && (
        <div className="mt-8">
          <img src={selectedImage} alt="Uploaded" className="w-64 h-64 object-cover mx-auto rounded-lg shadow-md" />
        </div>
      )}

      <button onClick={analyzeSkin} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Analyze Image</button>

      {result && !analyzing && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Check className="w-6 h-6 text-green-500 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">{result.disease.replace("_", " ").toUpperCase()}</h2>
          </div>

          <p className="text-gray-700 mb-2">
            Confidence Level: <span className="font-semibold">{result.confidence}%</span>
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-4">Recommended Solutions:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {diseaseDatabase[result.disease].solutions.map((sol, idx) => (
              <li key={idx}>{sol}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageDetection;