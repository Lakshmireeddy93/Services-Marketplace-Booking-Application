import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingForm.css";
function BookingForm({service}){
    const navigate= useNavigate();
    const [name,setName]=useState("");
    const [phone, setPhone]=useState("");
    const [address, setAddress]=useState("");
    const [date, setDate]=useState("");
    const [time, setTime]=useState("");
    //runs when confirm booking button is clicked
    async function handleSubmit(e){
        e.preventDefault();//prevent page refresh
        if (
            !name || !phone || !address || !date || !time 
        ) {
            alert("Please fill all the details.");
            return;
        }
        try {
            const token =localStorage.getItem("token");
            const bookingData={
                service:service._id,
                name: name,
                phone: phone,
                address: address,
                date:date,
                time:time
            };
            const response=await axios.post(
                "https://localhost:5000/api/bookings",
                bookingData,
                {
                    headers:{
                        Authorization: `Bearer $ {token}`
                    }
                }
            );
            navigate("/success", {
                state : response.data
            });
        }
        catch (error){
            console.log(error);
            alert ("Booking Failed");
        }
    }

    return(
        <div className="booking-container">
            <form className="booking-card" onSubmit={handleSubmit}>
                  <h1>{service.name}</h1>
                  <p>₹{service.price}</p>
                  <hr />
                <h2>Book Service</h2>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <br /><br />
                 <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
                <br /><br />
                <textarea
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                />
                <br /><br />
                 <input
                  type="date"
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                />
                <br /><br />
                <input
                  type="time"
                  value={time}
                  onChange={(e)=>setTime(e.target.value)}
                />
                <br /><br />
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    );

}
export default BookingForm;