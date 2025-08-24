import React, {useState, useEffect} from 'react';
import '../../App.css';
import InfoCard from '../InfoCard';
import ListingsCard from '../ListingsCard';
import PopUp from '../PopUp';


function LandlordDashboard({ userID }) {
    document.body.style.overflow = "scroll"

    const [listingsData, setListingsData] = useState([]) //store fetched listings
    const [reviewsData, setReviewsData] = useState([]) //store fetched reviews
    const [loadingListings, setLoadingListings] = useState(true); //tracking when listings fetches are finished
    const [loadingReviews, setLoadingReviews] = useState(true); //tracking when listings fetches are finished
    const [errors, setErrors] = useState("") //Catches network errors in real time
    const [togglePop, setTogglePop] = useState(false) //Tracks when the pop-up is enabled vs disabled
    const [name, setName] = useState("") //UNNECESSARY USE OF USE STATE// Stores username received from userId to display
    const API_URL = import.meta.env.VITE_API_URL
    

    //Fetch listingsData and reviewsData by userID
    useEffect(() => {
        const getReviews = async () => {
            setLoadingReviews(true);
            try {
                const response = await fetch(`${API_URL}/api/Reviews/GetReviewsByID/${userID}`);
                const data = await response.json();
                if (response.ok) {
                    setReviewsData(data.map(d => ({
                        Id: d.reviewId,
                        Role: d.role,
                        About: d.name,
                        Rating: d.rating,
                        Description: d.description
                    })));
                }
            } finally {
                setLoadingReviews(false);
            }
        };

        const getListings = async () => {
            setLoadingListings(true);
            try {
                const response = await fetch(`${API_URL}/api/listings/GetListingsByID/${userID}`);
                const data = await response.json();
                if (response.ok && data.length > 0) {
                    setListingsData(data.map((r) => (
                        {
                        ListingId: r.listingId,
                        Owner: r.username,
                        Address: r.address,
                        Price: r.price,
                        Bedrooms: r.numBedrooms,
                        Bathrooms: r.numBathrooms,
                        Description: r.description,
                        TypeOfPurchase: r.type
                        }

                    )))
                    setName(data[0].username)
                };
            } finally {
                setLoadingListings(false);
            }
        };

        getListings();
        getReviews();
    }, [API_URL, userID, name])

    async function handleDelete(id) {
        console.log("DELETING: ///" + id);
        const response = await fetch(`${API_URL}/api/Listings/DeleteListing/${id}`, { method: 'DELETE' });

        if (response.ok) {
            setListingsData(prev => prev.filter(listing => listing.ListingId !== id));
        }
    }
    function LoadListings() {
        if (!loadingListings && reviewsData.length > 0) {
            return (
                <div className="sub-container relative overflow-scroll">
                    {
                        listingsData.map((r) => (
                            <div key={r.ListingId}>
                                <ListingsCard
                                    key={r.ListingId}
                                    ListingId={r.ListingId}
                                    Owner={r.Owner}
                                    Address={r.Address}
                                    Price={r.Price}
                                    Bedrooms={r.Bedrooms}
                                    Bathrooms={r.Bathrooms}
                                    Description={r.Description}
                                    Images={r.Images}
                                    TypeOfPurchase={r.TypeOfPurchase}
                                />
                                <button
                                    onClick={() => handleDelete(r.ListingId)}
                                    className="-translate-y-26 absolute right-[10%] mb-5 flex items-center justify-center !border-2 !border-red-300 bg-red-100 text-red-600"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                </div>
            )
        } else if (!loadingReviews && listingsData.length == 0) {
            return <h1 className="p-10 text-lg font-semibold text-black">No data was found</h1>
        }
        return <h1 className="p-10 text-lg font-semibold text-black">{errors ? errors : "Loading..."}</h1>
    }

    function LoadReviews() {
        if (!loadingReviews) {
            return (
                <div className="sub-container overflow-scroll">
                    {reviewsData.map((r) => (
                        
                        <InfoCard
                            key={r.Id}
                            id={r.Id}
                            role={r.Role}
                            rating={r.Rating}
                            about={r.About}
                            desc={r.Description}
                        />
                        
                    ))}
                </div>
            )
        } else if (!loadingReviews && reviewsData.length == 0) {
            return <h1 className="p-10 text-lg font-semibold text-black">No data was found</h1>
        }
        
        return <h1 className="p-10 text-lg font-semibold text-black">{errors ? errors : "Loading..."}</h1>
    }

    console.log("ID from the dashboard:  ////   " + userID)
    return (
        <>
            <PopUp toggle={togglePop} setToggle={setTogglePop} id={userID} className="!fixed"/>
            <div className="mt-[7%] h-[200vh] w-full px-20 pt-10">
                <h1 className="flex pb-20 font-semibold text-[2.5rem] text-[#fcf8ff]">Welcome, {name}</h1>
                <h2 className="flex pb-2 text-lg">Your house listings...</h2>
                <div className="relative flex max-h-[80vh] min-h-[50vh] w-[90vw] overflow-scroll rounded bg-[#fcf8ff]">
                    <button
                        className="addListingBtn z-[20] absolute right-5 top-5 flex h-[5.5vh] items-center justify-center"
                        onClick={() => { setTogglePop(true) } }
                    >+
                    </button>
                    <LoadListings/>
                </div>
                <h2 className="flex pb-2 pt-[10rem] text-lg">Your Reviews so far...</h2>
                <div className="flex max-h-[80vh] min-h-[50vh] w-[90vw] overflow-scroll rounded bg-[#fcf8ff]">
                    <LoadReviews/>
                </div>
            </div>
        </>
    );
}

export default LandlordDashboard;