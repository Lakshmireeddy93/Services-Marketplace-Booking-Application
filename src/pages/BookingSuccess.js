import React from "react";
import { useLocation, useNavigate ,Navigate} from "react-router-dom";
import "./BookingSuccess.css";
function BookingSuccess(){
    const navigate=useNavigate();
    const location=useLocation();
    const booking = location.state;
    if (!booking){
        return <Navigate to="/services" />;
    }
    return(
        <div className="success-container">
            <div className="success-card">
                  <h1>Booking Successful</h1>
                  <p>Your booking has been placed successfully. </p>
                  <hr />
                  {/* backend ->booking id*/}
                  <p><strong>Booking ID:</strong> {booking._id}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Service ID:</strong> {booking.service}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <button onClick={() => navigate("/booking-history")}>View Booking History</button>
            </div>
            
        </div>
    );
}
export default BookingSuccess;