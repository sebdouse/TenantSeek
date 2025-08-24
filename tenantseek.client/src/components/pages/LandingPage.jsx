import React from 'react';
import '../../App.css';
import { useState, useRef, useEffect } from 'react'


function LandingPage() {
    document.body.style.overflow = "scroll"
    window.scrollTo(0, 0)
    const landingRef = [useRef(null), useRef(null), useRef(null)];
    const boxRefs = [useRef(null), useRef(null), useRef(null)];
    const [connectionSuccess, setConnectionSuccess] = useState(false)

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            setConnectionSuccess(false);
            return;
        }

        const checkConnection = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/users/TestConn`);
                if (response.ok) {
                    setConnectionSuccess(true);
                } else {
                    setConnectionSuccess(false);
                }
            } catch (error) {
                setConnectionSuccess(false);
                console.log("Error /////  " + error)
            }
        };

        checkConnection();
    }, [])

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        boxRefs.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        return () => observer.disconnect();
    }, [boxRefs]);


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
        landingRef.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        return () => observer.disconnect();
    }, [landingRef]);

    return (
        <div className="mt-20">
            <div className="bg-linear-to-r/srgb min-h-screen from-[#7844E5] to-[#4B21C0] text-[#fcf8ff]">
            <div className="relative flex min-h-screen flex-col items-center justify-center">
            <div className="title-animate absolute top-[25vh] z-10 block" ref={landingRef[0]}>
                <h1 className="mb-4 text-6xl font-bold tracking-wider">TenantSeek</h1>
                <p className="mb-8">Your one-stop solution for tenant management.</p>
            </div>
            <img src="landing-page-bg.png"
                className="bg-img-animate absolute bottom-[7%] right-[7%] h-auto w-[80vh]"
                alt="background of a house with a heart"
                ref={landingRef[1]}></img>
            <div ref={ landingRef[2] } className="bg-img-animate invisible absolute bottom-[30%] left-[15%] flex flex-col align-top text-2xl font-semibold sm:visible">
                <h2 className="flex">Better Tenants,</h2>
                <h2 className="flex">Better Management,</h2>
                <h2 className="flex">Better Life. For Everyone.</h2>
                    </div>
                </div>
        </div>
            <div className="flex max-h-[calc(2.5*100vh)] min-h-screen flex-col items-center justify-evenly bg-[#f0f0f0]">
                <div className="information-box-1" ref={boxRefs[0]}>
                    <h1 className="-translate-y-15 absolute right-[15%] top-0 font-semibold text-[2rem]">Who are we?</h1>
                    <img src="wave2.png" className="absolute right-5 h-[130%]"></img>
                    <div className="information-box-container" style={{ left: '10%' }} >
                        <h2 className="h-full w-full">
                            We are a team of landlords still in practise around the Kent area who noticed a problem.
                            When Landlord and Tenant relationships are low, landlords property gets less respect costing money in damages,
                            and tenants get slower and less support. Its a lose-lose! <br />
                            So we are stepping in to help foster existing relationships with your respective tenant/landlord and
                            also prevent working with problematic people in the first place by holding them accountable.
                        </h2>
                    </div>
                </div>
                <div className="information-box-2" ref={boxRefs[1]}>
                    <h1 className="-translate-y-15 absolute left-[5%] top-0 font-semibold text-[2rem]">What can we do for you?</h1>
                    <img src="handshake2.png" className="absolute left-10 h-[120%]"></img>
                    <div className="information-box-container" style={{ right: '10%' }}>
                        <h2 className="h-full w-full">
                            We are creating a community of people where people can celebrate their landlord or tenants great behaviour, driving up reputation and business
                            for good landlords, gathering trust and benefits for good tenants, whilst airing out the bad tenants and landlords before they can become a problem.
                            This is all through our anonymous review system. And with your talents and candor noticed, you can promote your listings with our community here too,
                            ensuring that you know whoever you work with is a part of a community who cares for each other. 
                        </h2>
                    </div>
                </div>
                <div className="information-box-1" ref={boxRefs[2]}>
                    <h1 className="-translate-y-15 absolute right-[12%] top-0 font-semibold text-[2rem]">Don't believe us?</h1>
                    <img src="detective.png" className="right-15 absolute h-[110%]"></img>
                    <div className="information-box-container !p-7" style={{ left: '10%' }} >
                        <h2 className="h-full w-full">
                            Great! Your caution is exactly what makes a good tenant or landlord! <br/>
                            Just check the <a href="https://www.trustpilot.com/review/tenantseek.co.uk">reviews</a> that we have (thats right, we get reviewed too) from others that have now joined our community,
                            or <a href="mailto:bestlandlordever@tenantseek.co.uk">talk to our agents</a> and we will answer any questions you might have. Or just give it a try! It's free after all, with no hidden fees.
                        </h2>
                    </div>
                </div>
            </div>
            <p>{connectionSuccess ? "Connection successful" : "Connection not Found"}</p>
        </div>

    );
}

export default LandingPage;