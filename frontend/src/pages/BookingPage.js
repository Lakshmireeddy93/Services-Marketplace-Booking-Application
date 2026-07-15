import React from "react";
import { useLocation, Navigate} from "react-router-dom";
import BookingForm from "../components/BookingForm";
function BookingPage(){
    //receive service data from ServiceDetails page
    const location=useLocation();
    //the recieved data will be stored in a variable called service
    const service=location.state;
    if(!service){
        return <Navigate to="/services"/>;
    }
    return(
        <div>
            {/* //booking form component */}
            <BookingForm service={service}/>
             {/* //components propname={variable} */}
        </div>
    );
}
export default BookingPage;

