import { Link } from 'react-router-dom';
import '../App.css';

function MainNav() {
    return (
        <>
        <nav className="sticky top-4 z-50 inline-flex w-[97%] justify-around gap-5 rounded-2xl border-2 border-[#5927E5] bg-[#7844E5] py-5 shadow">
            <Link to="/login" className="navButton">Landlord Login</Link>
            <Link to="/listings" className="navButton">Listings</Link>
                <Link to="/" aria-label="Home">
                    <img src="/dummyLogo.jpg" alt="TenantSeek Logo" className="h-15 w-auto rounded-full border-2 border-[#31157D]" />
                </Link>
            <Link to="/reviews" className="navButton">Reviews</Link>
            <Link to="/help" className="navButton">Help and Info</Link>
        </nav>
        <div
            name="sticky-navbar-interceptor"
            className=" overlay"/>
        </>
    );
}

export default MainNav;