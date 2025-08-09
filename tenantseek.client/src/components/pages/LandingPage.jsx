import React from 'react';
import '../../App.css';
import { useState, useRef, useEffect } from 'react'

function LandingPage() {
    const landingRef = [useRef(null), useRef(null), useRef(null)];
    const boxRefs = [useRef(null), useRef(null), useRef(null)];

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
        <>
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
                    <div className="information-box-container" style={{ left: '10%' }} ></div>
                </div>
                <div className="information-box-2" ref={boxRefs[1]}>
                    <div className="information-box-container" style={{ right: '10%' }}></div>
                </div>
                <div className="information-box-1" ref={boxRefs[2]}>
                    <div className="information-box-container" style={{ left: '10%' }} ></div>
                </div>
            </div>
            
        </>

    );
}

export default LandingPage;