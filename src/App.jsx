import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Services from './components/Services';
import Login from './pages/Login';
import Features from './pages/Features';
import Contact from './pages/Contact';
import MyProfile from './pages/Myprofile';
import Footer from './components/Footer';
import AppContextProvider from './context/Appcontext';
import AiDiagnosis from './pages/aidiagnosis';
import Emergency from './pages/Emergency';
import Profile_details from './components/Profile_details';
import EmergencyServices from './components/EmergencyServices';
import HealthEducation from './components/HealthEducation';
import ImageDetection from './components/ImageDetection';
import StressDetection from './components/StressDetection';
import VitalMonitoring from './components/VitalMonitoring';
import CommunitySupport from './components/CommunitySupport';
import { Kidney } from './components/Kidney';
import { Liver } from './components/liver';
import { Heart } from './components/Heart';
import { Diabetes } from './components/Diabetes';
import { Result } from './pages/result';
import  Chatbot  from './components/chatbot';
import Language from './components/language';

const App = () => {
  const [result, setResult] = useState(null);

  return (
    <AppContextProvider>
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path='/heart' element={<Heart setResult={setResult} />} />
          <Route path='/kidney' element={<Kidney setResult={setResult} />} />
          <Route path='/liver' element={<Liver setResult={setResult} />} />
          <Route path='/diabetes' element={<Diabetes setResult={setResult} />} />
          <Route path="/result" element={<Result result={result} />} />
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='services' element={<Services />} />
          <Route path='features' element={<Features />} />
          <Route path='login' element={<Login />} />
          <Route path='contact' element={<Contact />} />
          <Route path='myprofile' element={<MyProfile />} />
          <Route path='aidiagnosis' element={<AiDiagnosis />} />
          <Route path='emergency' element={<Emergency />} />
          <Route path='profile-details' element={<Profile_details />} /> {/* Updated duplicate "myprofile" */}
          <Route path='stress-detection' element={<StressDetection />} />
          <Route path='vital-monitoring' element={<VitalMonitoring />} />
          <Route path='image-detection' element={<ImageDetection />} />
          <Route path='health-education' element={<HealthEducation />} />
          <Route path='emergency-services' element={<EmergencyServices />} />
          <Route path='community-support' element={<CommunitySupport />} />
          <Route path='language' element={<Language/>}/>
          
        </Routes>
        <Chatbot/>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
