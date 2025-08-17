import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';


function LandlordLogin({login}) {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL
    const handleSubmission = async (e) => {
        e.preventDefault();
        const form = e.target.elements;
        const username = form.username.value;
        const password = form.password.value;

        try {
            const response = await fetch(`${API_URL}/api/users/Login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            

            if (!response.ok) {
                setError("Username or Password is incorrect, try again");
            } else {
                login(data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.log("Error: " + err)
          }
      };

    //useEffect(() => {
    //}, [])
    return (
        <>
            <div className="landlord-login-bg flex h-[100vh] w-[100vw] items-center justify-center bg-[#FCF8FF]">
                <form 
                  className="mt-30 z-10 flex h-[80%] w-[30%] flex-col items-start justify-center gap-10 rounded-[2rem] bg-[#9B89B3] p-10"
                  onSubmit={handleSubmission}
                >
                    <img src="dummyLogo.jpg" className="absolute top-40 h-auto w-[100px] self-end justify-self-start rounded-[100%] border"/>
                    <div className="flex h-[15%] flex-col items-start">
                        <label className="block pb-2 font-semibold text-[1.25rem]">Username </label>
                        
                        <input
                            type="text"
                            placeholder="Username"
                            className="h-[100%] rounded border bg-[#FCF8FF] pl-2"
                            name="username"
                        />
                    </div>

                    <div className="flex h-[15%] flex-col items-start">
                        <label className="block pb-2 font-semibold text-[1.25rem]">Password </label>
                        
                        <input
                            type="password"
                            placeholder="Password"
                            className="h-[100%] rounded border bg-[#FCF8FF] pl-2"
                            name="password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Log-In
                    </button>
                    <p>{error}</p>
                    <p className="absolute bottom-5 left-[40%] w-[30px%]">New landlord and want to join our community? <br/>
                        Contact us at tenantSeek@example.com <br/> and book a call!</p>
                </form>
                    
            </div>
        </>
    );
}

export default LandlordLogin;