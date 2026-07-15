import React from "react";

function BookingCard({booking}){
    return(
        <div className="card">
            <h2>{booking.service.name}</h2>
            <p><strong>Name :</strong>{booking.name}</p>
            <p><strong>Phone :</strong>{booking.phone}</p>
            <p><strong>Address :</strong>{booking.address}</p>
            <p><strong>Date :</strong>{booking.date}</p>
            <p><strong>Time :</strong>{booking.time}</p>
            <p><strong>Status :</strong>{booking.status}</p>
        </div>


    );
}
export default BookingCard;