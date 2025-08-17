import React, {useState, useEffect} from 'react';
import '../../App.css';
import InfoCard from '../InfoCard';
import ListingsCard from '../ListingsCard';


function LandlordDashboard({ userID }) {

    console.log("User ID: " + userID)

    const [listingsData, setListingsData] = useState([])
    const [reviewsData, setReviewsData] = useState([])
    const [errors, setErrors] = useState("")
    const [username, setUsername] = useState("")
    const API_URL = import.meta.env.VITE_API_URL

    //Fetch listingsData and reviewsData by userID
    useEffect(() => {

        const getReviews = async () => {
            const response = await fetch(`${API_URL}/api/Reviews/GetReviewsByID/${userID}`)
            const data = await response.json();
            setReviewsData(data.map(d => ({
                Id: d.reviewId,
                Role: d.role,
                About: d.name,
                Rating: d.rating,
                Description: d.description
            })));
        }

        const getListings = async () => {
            const response = await fetch(`${API_URL}/api/listings/GetListingsByID/${userID}`)
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
        try {
            getListings()
            getReviews()
        } catch(e) {
            setErrors(e)
        }
    }, [])

    function LoadListings() {
        if (listingsData) {
            return (
                <div className="sub-container z-10">
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
            )
        }
        return <h1 className="p-10 text-lg font-semibold text-black">{errors ? errors : "Loading..."}</h1>
    }

    function LoadReviews() {
        if (reviewsData) {
            return (
                <div className="sub-container">
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
        }
        return <h1 className="p-10 text-lg font-semibold text-black">{errors ? errors : "Loading..."}</h1>
    }

    return (
        <>
            <div className="mt-[7%] h-[200vh] w-full px-20 pt-10">
                <h1 className="flex pb-20 font-semibold text-[2.5rem] text-[#fcf8ff]">Welcome, **USERNAME**</h1>
                <h2 className="flex pb-2 text-lg">Your house listings...</h2>
                <div className="flex max-h-[80vh] min-h-[35vh] w-[90vw] rounded bg-[#fcf8ff]">
                    <LoadListings/>
                </div>
                <h2 className="flex pb-2 pt-[10rem] text-lg">Your Reviews so far...</h2>
                <div className="flex max-h-[80vh] min-h-[35vh] w-[90vw] rounded bg-[#fcf8ff]">
                    <LoadReviews/>
                </div>
            </div>
        </>
    );
}

export default LandlordDashboard;