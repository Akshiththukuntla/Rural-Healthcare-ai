import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col  md:flex-row flex-wrap bg-primary rounded-lg  px-6 md:px-10 lg:px-20">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-4 md:text-4xl lg:text5xl text-white font-bold leading-tight md:leading-tight lg:leading-tight">
          AI-powered healthcare for <br /> rural communities
        </p>
        <div className="flex flex-cols flex-row items-center gap-3 text-white text-m font-light">
          <img src={assets.group_profiles} alt="Group Profiles" className="w-28" />
          <p>Health is the greatest wealth<br className="hidden sm:block" /> it enables us to live fully and accomplish our dreams.</p>
        </div>
        <a href="#features1" className="flex items-center gap-2 bg-white px-8 py-3 rounded-lg text-gray-900 text-m m-auto md:m-0 hover:scale-105 transition-all duration-300">
          Features <img className="width-2" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>
      <div className="md:w-1/2 relative">
        <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt="Header" />
      </div>
    </div>
  );
};

export default Header;
