import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); 
  const [token, setToken] = useState(true); 

  useEffect(() => {
    const userToken = localStorage.getItem('token'); 
    if (userToken) {
      setToken(true);
    }
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-40 cursor-pointer" src={assets.logo} alt="Logo" onClick={() => navigate('/')} />
      <ul className={`md:flex ${showMenu ? "block" : "hidden"} items-start gap-5 font-medium`}>
        <NavLink to="/" className="group">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/features" className="group">
          <li className="py-1">Features</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/aidiagnosis" className="group">
          <li className="py-1">AI Diagnosis</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/emergency" className="group">
          <li className="py-1">Emergency</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
      </ul>
      <div className="relative group flex items-center gap-4">
        {token ? (
          <div className="realtive group cursor-pointer">
            <div className="flex items-center gap-2">
              <img src={assets.profile_pic} alt="Profile" className="w-10 h-10 rounded-full" />
              <img src={assets.dropdown_icon} alt="Dropdown" className="w-4 h-4" />
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 text-gray-600 text-sm font-medium hidden group-hover:block">
              <ul className="min-w-48 bg-stone-40 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('myprofile')} className="hover:text-black cursor-pointer px-3 py-2">My Profile</p>
                <p onClick={() => navigate('myorders')} className="hover:text-black cursor-pointer px-3 py-2">My Orders</p>
                <p className="hover:text-black cursor-pointer px-3 py-2" onClick={() => {
                  localStorage.removeItem('token');
                  setToken(false);
                  navigate('/login');
                }}>
                  Logout
                </p>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
