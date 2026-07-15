import { Link } from "react-router-dom";
import React from "react";
function Navbar(){
    return(
        <nav>
            <h2>Services Marketplace</h2>
            <Link to="/services">Services</Link>
            {"|"}
            <Link to="/booking-history">My Bookings</Link>
        </nav>

    );
}
export default Navbar;