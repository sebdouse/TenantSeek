import '../App.css';

function InfoCard({ id, role, about, rating, desc}) {
    
    return (
        <div className="info-card text-black">
            <div className="flex">
                <div className="flex h-full w-[15vw] flex-col items-start">
                    <div className="items-center">
                        <h1 className="mb-1">{role}: {about}</h1>
                        <div className="inline">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span className="text-md" key={i}>{(i < rating) ? "⭐" : "✰"}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex h-full w-full items-center justify-start rounded">
                    <div className="block h-full w-full">
                        <p className="flex">Description</p>
                        <div className="reverse-shadow flex max-h-[12vh] min-h-[10vh] w-[40vw] rounded border border-black bg-[#fcf8ff] p-2">
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;