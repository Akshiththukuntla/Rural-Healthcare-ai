import React, { useContext } from 'react';
import { AppContext } from '../context/Appcontext';

const Tips = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Healthy Tips!</h1>
      <p className="sm:w-1/3 text-center text-sm">Be fit and healthy</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 px-3 sm:px-0"> 
        {Array.isArray(doctors) && doctors.slice(0, 9).map((item, index) => (  
          <div 
            key={index} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="w-full h-48 object-cover bg-blue-50" src={item.image} alt={item.tip} />
            <div className="p-4">
              <p className="font-bold text-xl">{item.tip || "Tip not available"}</p>
              <p className="text-sm text-gray-600">{item.description || "Description not available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
