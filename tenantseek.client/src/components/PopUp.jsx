import '../App.css';

function PopUp({ toggle, setToggle, id }) {
    console.log("ID from pop-up:   ////   " + id)
    async function handleSubmission(e) {
        const API_URL = import.meta.env.VITE_API_URL
        e.preventDefault()
        const form = e.target.elements
        const address = form.address.value
        const price = form.price.value
        const type = form.rental.value ? "Rental" : "Buy-To-Own"
        const numBathrooms = form.numBathrooms.value
        const numBedrooms = form.numBedrooms.value
        const description = form.description.value
        const response = await fetch(`${API_URL}/api/listings/CreateListing`, {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                UserId: id, address, type, description, price, numBathrooms, numBedrooms //Map CreateListingDTO on the functions parameter intake
            })
        })
        setToggle(false)
    }


    if (toggle) {
        document.body.style.overflow = "hidden"
        return (
            <div className="overlay">
                <form
                    onSubmit={ handleSubmission }
                    className="relative mt-[10%] flex h-[60vh] w-[60vw] flex-col items-start justify-evenly gap-2 rounded bg-white p-10">
                    <button
                        className="absolute right-2 top-2 flex items-center justify-center text-red-600"
                        onClick={() => { setToggle(false) } }
                    >X
                    </button>
                    <div>
                        <label>Address  </label>
                        
                        <input
                            name="address"
                            type="text"
                            placeholder="Address"
                            className="form-data"
                        />
                    </div>
                    <div className="relative flex w-full justify-start">
                        <label>Price    </label>
                        <p className="absolute left-[5.5%] top-0">£</p>
                        <div className="absolute right-[25%] top-0 w-full gap-5">
                            <label>Rental?</label>
                            <input name="rental" type="checkbox" />
                        </div>
                        <input
                            name="price"
                            type="text"
                            placeholder="Price"
                            className="form-data z-[40] w-[16%] !pl-5"
                        />
                    </div>
                    <div>
                    <label>No. Bathrooms    </label>
                        <input
                            name="numBathrooms"
                            type="text"
                            className="form-data inline-flex w-[4vh] items-center justify-center border"
                        />
                    </div>
                    <div>
                    <label>No. Bedrooms</label>
                        <input
                            name="numBedrooms"
                            type="text"
                            className="form-data inline-flex w-[4vh] items-center justify-center border"
                        />
                    </div>
                    <div className="flex h-full w-full flex-col items-start">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        placeholder="Tell us about your property..."
                        className="form-data desc mt-1 max-h-[100%] min-h-[75%] w-full p-2"
                    />
                    </div>
                    <div className="absolute bottom-[50%] left-[50%] ml-5 mt-5 flex flex-col items-start p-5">
                    <label>Choose your images</label>
                        <input type="file" placeholder="images" className="cursor-pointer bg-[#E8E5EB]" />
                    </div>
                    <button
                        type="submit"
                        className="absolute bottom-2 right-2 flex items-center justify-center bg-[#747bff] text-white"
                    >Submit
                    </button>
                </form>
            </div>
        )
    }
    else {
        document.body.style.overflow = "scroll"
        return
    }
}

export default PopUp;