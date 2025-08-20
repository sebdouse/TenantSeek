import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import ListingsCard from '../ListingsCard.jsx'


function Listings() {
    document.body.style.overflow = "hidden"
    window.scrollTo(0, 0)

    const [listingsData, setListingsData] = useState([])
    const [query, setQuery] = useState("")
    const [sendQuery, setSendQuery] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL;
    document.body.style.overflow = "hidden"

    useEffect(() => {

        const getListings = async () => {
            try {
                let response;
                if (query != "") {
                    response = await fetch(`${API_URL}/api/listings/GetListingsBySearch/${query}`)
                    setQuery("")
                }
                else {
                response = await fetch(`${API_URL}/api/listings`)
                }
                const data = await response.json()
                setListingsData(data.map((r) => (
                    {
                        Owner: r.username,
                        Address: r.address,
                        Price: r.price,
                        Bedrooms: r.numBedrooms,
                        Bathrooms: r.numBathrooms,
                        Description: r.description,
                        Images: '', //Will Implement Later with FileTables
                        TypeOfPurchase: r.type
                    }
                )));
                
            }   
            catch (e) {
                console.log("Error" + e)
                }
        }
        getListings()
        
    }, [sendQuery])

    useEffect(() => {
        console.log("listingsData updated:", listingsData);
    }, [listingsData]);

    const listingRef = useRef(null)
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
        if (listingRef.current) {
            observer.observe(listingRef.current);
        }
        return () => observer.disconnect();
    }, []);

    function handleKeyEvent(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setQuery(query)
            setSendQuery(!sendQuery)
        }
    }

    return (
        <>
            <div className="mt-25 min-h-screen text-[#fcf8ff]">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="reviews-animate absolute top-[4vh] z-30 block" ref={listingRef}>
                        <div className="main-container">
                            <form className="absolute flex h-[12.5%] w-full justify-start p-5 text-black">
                                <input className="z-20 ml-[20%] w-[20%] rounded-[2rem] border border-black pl-3"
                                    type="text"
                                    placeholder="Search by name or address:"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    onKeyDown={handleKeyEvent}
                                />
                            </form>
                            <div className="sub-container z-10 mt-[10vh]">
                                {   
                                    listingsData.map((r, i) => (
                                    <ListingsCard key={i}
                                        Owner={r.Owner}
                                        Address={r.Address}
                                        Price={r.Price}
                                        Bedrooms={r.Bedrooms}
                                        Bathrooms={r.Bathrooms}
                                        Description={r.Description}
                                        Images={r.Images}
                                        TypeOfPurchase={r.TypeOfPurchase}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listings;