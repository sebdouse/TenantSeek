import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';
import InfoCard from '../InfoCard';
import AddReview from '../AddReview';
function Reviews() {
    document.body.style.overflow = "hidden"
    window.scrollTo(0,0)
    const reviewRef = useRef(null);
    const [filterBtn, setFilterBtn] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [connectionSuccess, setConnectionSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState("");
    const [sendQuery, setSendQuery] = useState(false)
    const [toggle, setToggle] = useState(false)
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
            { threshold: 0 }
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
        <>
            <AddReview toggle={toggle} setToggle={setToggle}/> 
            <div className="mt-25 min-h-screen text-[#fcf8ff]">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="reviews-animate absolute top-[4vh] block" ref={reviewRef}>
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
                                <button
                                //className=" relative left-3 top-4 h-[7%] w-[3%] translate-x-[82vw] bg-green-400 !p-0 !text-xl"
                                className="addListingBtn z-[20] absolute right-10 top-5 flex h-[5.5vh] items-center justify-center text-black"
                                    onClick={() => { setToggle(true) }}
                                >+</button>
                            <div className="sub-container mt-[10vh]">
                                {reviews.map((r) => (
                                    <InfoCard key={r.Id} id={r.Id} role={r.Role} rating={r.Rating} about={r.About} desc={r.Description} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
            );
}

export default Reviews;