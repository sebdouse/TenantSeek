import React, { useEffect, useRef } from 'react';
import '../../App.css';



function HelpAndInfo() {

    const helpRef = [useRef(null)]

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );
        helpRef.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        return () => observer.disconnect();
    }, [helpRef]);

    return (
        <>
            <div ref={helpRef[0]} className="help-animate mb-[10vh] mt-[20vh] flex h-full w-full flex-col items-center justify-center gap-20">
                <div>
                    <h1 className="flex justify-start p-5 font-semibold text-[3rem] text-white">Privacy Policy</h1>
                    <div className=" flex h-[35vh] w-[85vw] rounded-[1rem] bg-white p-5">
                        <p>I promise to not steal all your data and delete it when not used anymore and such</p>
                    </div>
                </div>
                <div>
                    <h1 className="flex justify-start p-5 font-semibold text-[3rem] text-white">Code of Conduct</h1>
                    <div className=" flex h-[35vh] w-[85vw] rounded-[1rem] bg-white p-5">
                        <p>Don't be a meanie. No racism, sexism or discrimination of any kind. Comments should be only about the property or behaviour exhibited by the reviewee that directly affect the reviewer</p>
                    </div>
                </div>
                <div>
                    <h1 className="flex justify-start p-5 font-semibold text-[3rem] text-white">Terms and Conditions</h1>
                    <div className="flex h-[35vh] w-[85vw] rounded-[1rem] bg-white p-5">
                        <p>By using this app, you relinquish all your worldly assets to me, Sebastien Douse. If you are reviewed and get anything below 5 stars, we will sue you for defamation and win because we have disney lawyers and can do what we want.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpAndInfo;