import '../App.css';
import { useState, useEffect } from 'react'

function AddReview({ toggle, setToggle}) {
    const API_URL = import.meta.env.VITE_API_URL
    const[_type, setType] = useState(false)

    async function handleSubmission(e) {
        e.preventDefault()
        const form = e.target.elements
        const about = form.about.value
        const type = _type ? "Tenant" : "Landlord"
        const rating = form.rating.value
        const description = form.description.value
        const response = await fetch(`${API_URL}/api/Reviews/AddReview`, {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                about, type, rating, description
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
                        <label>About  </label>
                        
                        <input
                            name="about"
                            type="text"
                            placeholder="About"
                            className="form-data"
                        />
                    </div>
                    <div className="relative block">
                        <label className="min-w-[100] pr-5">Relationship: My {_type ? "Tenant" : "Landlord"}</label>
                    </div>
                        <button
                            className="selector-btn absolute left-[25%] top-[15%] w-[8%] !text-xs"
                            onClick={() => { setType(!_type) }}>Change</button>
                    <div>
                    <label>Rating</label>
                        <input
                            name="rating"
                            type="number"
                            min="0"
                            max="5"
                            className="form-data inline-flex w-[3vw] items-center justify-center border"
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
        return
    }
}

export default AddReview;