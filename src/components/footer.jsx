import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-gray-100 px-18 sm:px-32 md:px-20 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-gray-700">
        <div>
          <img src={assets.logo} alt="Logo" className="mb-5 w-40" />
          <p className="w-full md:w-2/3 leading-6">
          Rural Healthcare AI is an innovative platform designed to provide accessible and AI-driven medical assistance to rural communities. </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">Features</li>
            <li className="hover:text-blue-500 cursor-pointer">AiDiagnosis</li>
            <li className="hover:text-blue-500 cursor-pointer">Emergency</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">ruralhealthcareai@example.com</li>
            <li className="hover:text-blue-500 cursor-pointer">+91 8978737033</li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-10 pt-5 text-center text-sm text-gray-600">
        <p>© 2025 Team 65777880. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
