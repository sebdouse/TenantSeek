import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';
import InfoCard from '../InfoCard';
function Reviews() {
    const reviewRef = useRef(null);
    const [filterBtn, setFilterBtn] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [connectionSuccess, setConnectionSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState("");
    const [sendQuery, setSendQuery] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        

        const getReviews = async () => {
            
            try {
                setIsLoading(true)
                let response;
                if (filterBtn && !query) {
                    response = await fetch(`${apiUrl}/api/reviews/GetReviewsByType/${filterBtn}`);
                }
                else if (query) {
                    setFilterBtn(null)
                    response = await fetch(`${apiUrl}/api/reviews/GetReviewsByName/${query}`);
                    setQuery("")
                }
                else { 
                    response = await fetch(`${apiUrl}/api/reviews/GetAllReviews`);
                }
                const data = await response.json();
                setIsLoading(false)
                setReviews(data.map(d => ({
                    Id: d.reviewId,
                    Role: d.role,
                    About: d.name,
                    Rating: d.rating,
                    Description: d.description
                })));
            } catch (error) {
                setConnectionSuccess(false);
                console.log(error);
            }

        };

        getReviews();
    }, [filterBtn, sendQuery]);

    //function InfoCard({ id, role, about, rating, desc }) {
    //    if (isLoading) {
    //        return <h1 className="text-black">Loading...</h1>
    //    }
    //    return (
    //        <div className="info-card text-black">
    //            <div className="flex">
    //                <div className="flex h-full w-[15vw] flex-col items-start">
    //                    <div className="items-center">
    //                        <h1 className="mb-1">{role}: {about}</h1>
    //                        <div className="inline">
    //                            {Array.from({ length: 5 }).map((_, i) => (
    //                                <span className="text-md" key={i}>{(i < rating) ? "⭐" : "✰"}</span>
    //                            ))}
    //                        </div>
    //                    </div>
    //                </div>
    //                <div className="flex h-full w-full items-center justify-start rounded">
    //                    <div className="block h-full w-full">
    //                        <p className="flex">Description</p>
    //                        <div className="reverse-shadow flex max-h-[12vh] min-h-[10vh] w-[40vw] rounded border border-black bg-[#fcf8ff] p-2">
    //                            <p>{desc}</p>
    //                        </div>
    //                    </div>
    //                </div>
    //            </div>
    //        </div>
    //    );
    //}

    // Animation useEffect (unchanged)
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

    ////Searching function
    

    function handleKeyDown(e) {
        
        if (e.key === "Enter") {
            e.preventDefault();
            setQuery(e.target.value)
            setSendQuery(!sendQuery)
        }
    }
        useEffect(() => {console.log(query)}, [query])

    return (
        <div className="mt-25 min-h-screen text-[#fcf8ff]">
            <div className="relative flex min-h-screen flex-col items-center justify-center">
                <div className="reviews-animate absolute top-[4vh] z-30 block" ref={reviewRef}>
                    <div className="main-container">
                        <form className="absolute z-20 flex h-[12.5%] w-full justify-evenly border-b border-b-black p-5 text-black">
                            <input
                                className="rounded-[2rem] border border-black pl-3"
                                type="text"
                                placeholder="Search by name:"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
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
                            {reviews.map((r) => (
                                <InfoCard key={r.Id} id={r.Id} role={r.Role} rating={r.Rating} about={r.About} desc={r.Description} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;