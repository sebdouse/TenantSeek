import '../App.css';
import { useEffect, useState } from 'react'


function ListingsCard(props) {
    const API_URL = import.meta.env.VITE_API_URL
    const [fileURLs, setFileURLs] = useState([null, null, null, null])
    
    useEffect(() => {
        const getFiles = async () => {
            const response = await fetch(`${API_URL}/api/listings/GetImagesById/${props.ListingId}`)
            const data = await response.json()
            setFileURLs(data)
        }
        getFiles()
    }, [])

    

    return (
        <>
        <div className="info-card overflow-hidden text-black">
            <div className="flex h-full w-full">
                <div className="block h-full w-[40%]">
                    <h1 className="mb-1 flex justify-start font-semibold text-[1rem]"><span className="!font-bold">Address: </span> {props.Address}</h1>
                    <h1 className="flex justify-start font-semibold"> <span className="!font-bold">Owner: </span> {props.Owner}</h1>
                    <div className="mt-[1.5%] h-[60%] w-[100%] overflow-hidden rounded border border-black bg-[#966fd1] p-2 shadow-inner">
                        <p className="flex text-sm font-medium">Description: {props.Description}</p>
                    </div>
                </div>
                <div className="mx-[5%] flex h-full w-[50%]">
                    <div className="collage h-[100%] w-[68%]">
                        <div className="c-img-1">
                            <img className="h-full w-full" src={fileURLs.length >= 0 ? API_URL + fileURLs[0]: 'template_image.jpg'} />
                        </div>
                        <div className="c-img-2">
                            <img className="h-full w-full" src={fileURLs.length >= 1 ? API_URL + fileURLs[1] : 'template_image.jpg'} />
                        </div>
                        <div className="c-img-3">
                            <img className="h-full w-full" src={fileURLs.length >= 2 ? API_URL + fileURLs[2] : 'template_image.jpg'} />
                        </div>
                        <div className="c-img-4 relative">
                            <div className={fileURLs.length > 3 ? "cover" : "invisible"}>
                                <p
                                    className="font-medium text-gray-300 hover:cursor-pointer hover:font-bold"
                                        onClick={() => { props.setToggleGallery(true); props.setGalleryFiles(fileURLs)}}
                                >See More</p>
                            </div>
                                <img className="h-full w-full" src={fileURLs.length >= 3 ? API_URL + fileURLs[3] : 'template_image.jpg'} />
                            
                        </div>
                    </div>
                    <div className="flex w-[40%] flex-col justify-evenly justify-self-end pl-3 font-medium">
                        <p className="text-[125%]">Price: £{props.Price} {props.TypeOfPurchase == "Rental" ? "p/m" : ""}</p>
                        <p>Bathrooms: {props.Bathrooms}</p>
                        <p>Bedrooms: {props.Bedrooms}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ListingsCard;