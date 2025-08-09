import React, { useRef, useEffect } from 'react';
import '../../App.css';

function Reviews() {
    const reviewRef = useRef(null);

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
        if (reviewRef.current) {
            observer.observe(reviewRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen text-[#fcf8ff]">
            <div className="relative flex min-h-screen flex-col items-center justify-center">
                <div className="reviews-animate absolute top-[25vh] z-10 block" ref={reviewRef}>
                    <h1 className="mb-4 text-6xl font-bold tracking-wider">TenantSeek Reviews</h1>
                </div>
            </div>
        </div>
    );
}

export default Reviews;