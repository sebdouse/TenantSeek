import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import MainNav from './components/MainNav.jsx';

// Import your page components
import LandlordLogin from './components/pages/LandlordLogin.jsx';
import Listings from './components/pages/Listings.jsx';
import Reviews from './components/pages/Reviews.jsx';
import HelpAndInfo from './components/pages/HelpAndInfo.jsx';
import LandingPage from './components/pages/LandingPage.jsx';

function App() {
    return (
        <BrowserRouter>
          <div className="min-h-full bg-gradient-to-r from-[#7844E5] to-[#4B21C0]">
            <MainNav />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LandlordLogin />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/help" element={<HelpAndInfo />} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default App;


