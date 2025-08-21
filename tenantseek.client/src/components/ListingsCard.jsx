import '../App.css';

function ListingsCard(props) {
    return (
        <div className="info-card overflow-hidden text-black">
            <div className="flex h-full w-full">
                <div className="block h-full w-[40%]">
                    <h1 className="mb-1 flex justify-start text-[1rem]"><b>Address: </b> {props.Address}</h1>
                    <h1 className="flex justify-start"> <b>Owner: </b> {props.Owner}</h1>
                    <div className="reverse-shadow mt-[1.5%] h-[60%] w-[100%] overflow-hidden rounded border border-black bg-[#fcf8ff] p-2">
                        <p className="flex text-sm">Description: {props.Description}</p>
                    </div>
                </div>
                <div className="ml-[5%] flex h-full w-[50%]">
                    <div className="collage h-[100%] w-[66%] shadow">
                        <div className="c-img-1" />
                        <div className="c-img-2" />
                        <div className="c-img-3" />
                        <div className="c-img-4" />
                    </div>
                    <div className="flex w-[40%] flex-col justify-evenly justify-self-end pl-3">
                        <p className="text-[125%]">Price: £{props.Price} {props.TypeOfPurchase == "Rental" ? "p/m" : ""}</p>
                        <p>Bathrooms: {props.Bathrooms}</p>
                        <p>Bedrooms: {props.Bedrooms}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingsCard;