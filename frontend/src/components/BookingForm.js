import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookingForm.css";
function BookingForm({service}){
    const navigate= useNavigate();
    const [name,setName]=useState("");
    const [phone, setPhone]=useState("");
    const [address, setAddress]=useState("");
    const [date, setDate]=useState("");
    const [time, setTime]=useState("");
    async function handleSubmit(e) {
          e.preventDefault();
          console.log("Confirm Booking clicked");

    if (!name || !phone || !address || !date || !time) {
        alert("Please fill all the details.");
        return;
    }
    if (!/^[0-9]{10}$/.test(phone)){
        alert("Enter valid 10 digit phone number.");
        return;
    }
     try {
       const token = localStorage.getItem("token");
       console.log("Token:", token);

       if (!token) {
          alert("Please login first");
          navigate("/login");
          return;
       }
         const bookingData = {
            service: service._id,
            name,
            phone,
            address,
            date,
            time,
        };

        const response = await axios.post(
            "http://localhost:5000/api/bookings",
            bookingData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Booking Success:", response.data);
        navigate("/booking-success", {
            state: response.data
        });

    } catch (error) {
        console.log("ERROR:", error);
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

        alert("Booking Failed");
    }
}
 if(!service){
    return <h2>Loading...</h2>
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
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                     const value = e.target.value.replace(/\D/g, "");
                     setPhone(value);
                   }}
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
                  min={new Date().toISOString().split("T")[0]}
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