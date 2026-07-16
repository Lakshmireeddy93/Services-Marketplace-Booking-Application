import React from "react";
import "../styles/BookingPage.css";
import { useLocation, Navigate} from "react-router-dom";
import BookingForm from "../components/BookingForm";
import "../styles/BookingPage.css";

function BookingPage(){
    const location=useLocation();
    const service=location.state;
    if(!service){
        return <Navigate to="/services"/>;
    }
    return(
        <div className="booking-page">
            {/* //booking form component */}
            <BookingForm service={service}/>
             {/* //components propname={variable} */}
        </div>
    );
}
export default BookingPage;

