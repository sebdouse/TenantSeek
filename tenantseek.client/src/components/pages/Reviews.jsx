import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';

function Reviews() {
    const reviewRef = useRef(null);
    const [filterBtn, setFilterBtn] = useState("Landlord");

    //Dummy data whilst the backend is unwritten
    const exampleReviews = [
        {
            'Id': 0,
            'Role': 'Tenant',
            'About': 'John Doe',
            'Rating': 1,
            'Description': 'Terrible tenant, never lease'
        },
        {
            'Id': 1,
            'Role': 'Landlord',
            'About': 'Seb Douse',
            'Rating': 4,
            'Description': 'Incredible landlord, the best even. Best landlord in America, he really is, I would know.'
        },
        {
            'Id': 2,
            'Role': 'Tenant',
            'About': 'Jane Doe',
            'Rating': 3,
            'Description': 'Decent tenant, no troubles during lease but did not clean up well after moving out.'
        },
        {
            'Id': 3,
            'Role': 'Landlord',
            'About': 'Alex Douse',
            'Rating': 5,
            'Description': 'Extremely responsible and friendly landlord. Always looks out for me and so thats why I always look out for him. His son is awesome as well.'
        }
    ];

    function InfoCard({ id, role, about, rating, desc})
    {
        return (
            <div className="info-card text-black">
                <div className="flex">
                    <div className="flex h-full w-[15vw] flex-col items-start">
                        <div className="items-center">
                            <h1 className="mb-1">{role}: {about}</h1>
                    
                            <div className="inline">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span className="text-md" key={i}>{(i < rating) ? "⭐" : "✰"}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-full items-center justify-start rounded">
                        <div className = "block h-full w-full">
                            <p className="flex">Description</p>
                            <div className="reverse-shadow flex max-h-[12vh] min-h-[10vh] w-[40vw] rounded border border-black bg-[#fcf8ff] p-2">
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Animation useEffect
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );
        if (reviewRef.current) {
            observer.observe(reviewRef.current);
        }
        return () => observer.disconnect();
    }, []);

    function aboutButton(e) {
        e.preventDefault();
        setFilterBtn(e.target.value);
    }

    return (
        <div className="mt-25 min-h-screen text-[#fcf8ff]">
            <div className="relative flex min-h-screen flex-col items-center justify-center">
                <div className="reviews-animate absolute top-[4vh] z-30 block" ref={reviewRef}>
                    <div className="main-container">
                        <form className="absolute z-20 flex h-[12.5%] w-full justify-evenly border-b border-b-black p-5 text-black">
                            <input className="rounded-[2rem] border border-black pl-3" type="text" placeholder="Search by name:" />
                            <div className="inline-flex items-center gap-5">
                                <p className="font-semibold">About:</p>
                                <button
                                    id="landlord-btn"
                                    type="button"
                                    onClick={aboutButton}
                                    value="Landlord"
                                    className={`selector-btn${filterBtn === "Landlord" ? " selected" : ""}`}>
                                    Landlord
                                </button>
                                <button
                                    id="tenant-btn"
                                    type="button"
                                    onClick={aboutButton}
                                    value="Tenant"
                                    className={`selector-btn${filterBtn === "Tenant" ? " selected" : ""}`}>
                                    Tenant
                                </button>
                            </div>
                        </form>
                        <div className="sub-container">
                            {exampleReviews.map((r) => (
                                <InfoCard key={r.Id} id={r.Id} role={r.Role} rating={r.Rating} about={r.About} desc={r.Description}/>
                            ))}

                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;