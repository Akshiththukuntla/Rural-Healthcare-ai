import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
    window.scrollTo(0, 0);
  };
  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      <div className="flex-1 py-10 sm:py-10 md:py-16 lg:py-24 lg-pl-5">
        <div className="text-white font-semibold">
          <p className="text-xl sm:text-4xl md:text-5xl lg:text-6xl">"With over 100 users and utilizing advanced AI/ML models"</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4">we provide cutting-edge solutions to our clients</p>
        </div>
        <button 
          onClick={handleClick} 
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-[350px] relative">
        <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img} alt="Appointment" />
      </div>
    </div>
  );
};
export default Banner;
