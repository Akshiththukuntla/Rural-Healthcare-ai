import React from 'react';
import { FaPhoneAlt, FaAmbulance, FaMedkit, FaHeartbeat, FaBrain, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
const emergencyServices = [
  { title: 'Emergency Hotline', description: 'Dial 112 for immediate assistance', icon: <FaPhoneAlt /> },
  { title: 'Ambulance', description: 'Call an ambulance for medical emergencies', icon: <FaAmbulance /> },
  { title: 'First Aid', description: 'Basic first aid tips and guidance', icon: <FaMedkit /> },
  { title: 'CPR Instructions', description: 'Learn how to perform CPR', icon: <FaHeartbeat /> },
  { title: 'Mental Health Support', description: 'Access mental health resources', icon: <FaBrain /> },
  { title: 'General Tips', description: 'Essential tips for various emergencies', icon: <FaInfoCircle /> },
];

const EmergencyFeatures = () => {
  const handleCardClick = async (service) => {
    if (service.title === 'Emergency Hotline') {
      try {
        const response = await axios.post('http://localhost:5000/send-message');
        console.log(response.data);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-4xl font-medium text-blue-600">Emergency Services</h1>
      <p className="sm:w-1/3 text-center text-lg text-gray-700">Quick access to essential emergency services</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 px-3 sm:px-0">
        {emergencyServices.map((service, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:bg-blue-100 transition-all duration-500 flex flex-col items-center p-4 text-center"
            onClick={() => handleCardClick(service)}
          >
            <div className="text-5xl text-blue-500 mb-4">{service.icon}</div>
            <p className="font-bold text-xl text-blue-600">{service.title}</p>
            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyFeatures;
