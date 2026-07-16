import { getBookings } from "../services/bookingService";
import React, { useState,useEffect } from "react";
import BookingCard from "../components/BookingCard";
import "../styles/BookingHistory.css";
function BookingHistory(){
    const [bookings, setBookings]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]= useState("");
    const loadBookings=async()=>{
        try{
            const response=await getBookings();
            setBookings(response.data);
        } catch (error){
            console.log(error);
            setError("Failed to load bookings");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        loadBookings();
    },[]);
    if (loading){
        return <h2>Loading...</h2>;
    }
    if (error){
        return <h2>{error}</h2>;
    }


    return (
    <div className="bookinghistory">
        <h2>My Bookings</h2>

        {
            bookings.length === 0 ?
            (
                <p>No Bookings Found</p>
            )
            :
            (
                <div className="booking-container">
                    {
                        bookings.map((booking)=>(
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))
                    }
                </div>
            )
        }

    </div>
);
}
export default BookingHistory;