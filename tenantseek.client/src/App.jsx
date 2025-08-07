import { useEffect, useState } from 'react';
import './App.css';
import MainNav from './components/MainNav.jsx';

    function LandingPage() {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome to TenantSeek</h1>
                <p className="text-secondary mb-8">Your one-stop solution for tenant management.</p>
                <button className="px-6 py-2 bg-accent text-white rounded hover:bg-orange-600 transition duration-300">
                    Get Started
                </button>
            </div>
        );
    }
function App() {


    return (<>
        <div>
            <MainNav/>
        </div>
        <LandingPage />
    </>)
    
}

export default App;