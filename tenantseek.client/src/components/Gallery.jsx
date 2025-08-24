import '../App.css';

function Gallery({ files, toggleGallery, setToggleGallery}) {
    const API_URL = import.meta.env.VITE_API_URL;
    if (toggleGallery) {
        return (
            <div className="overlay !z-[100] fixed flex justify-center overflow-scroll">
                <button
                    className="fixed right-5 top-5 bg-transparent p-5 font-bold text-white"
                    onClick={() => { setToggleGallery(false) }}
                >X</button>
                <div className="flex flex-col items-center justify-start">
                    {files.map((url, i) => (
                        <img key={i} src={API_URL + url} className="m-2 w-[40vw] border-4"/>
                    ))}
                </div>
            </div>
        );
    } else return
}

export default Gallery;