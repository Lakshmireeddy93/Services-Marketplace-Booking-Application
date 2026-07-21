import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import "../styles/ServiceDetails.css";
import api from "../services/api";
function ServiceDetails(){
    const navigate=useNavigate();
    const{id}=useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const[error, setError]= useState("");
    useEffect(()=>{
        fetchService();
    },[]);
    async function fetchService() {
       try {
        console.log("Service ID:", id);

        const response = await api.get(`/services/${id}`);

        console.log("Response:", response);
        console.log("Response Data:", response.data);

        setService(response.data);
       } catch (error) {
        console.log("ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("MESSAGE:", error.message);

        setError("Unable to load service.");
      } finally {
        setLoading(false);
      }
    }

    function handleBookNow(){
        navigate("/booking", {
            state: service
        });
    }
    if (loading){
        return <h2>Loading</h2>;
    }
    if (error){
        return <h2>{error}</h2>;

    }
    if (!service){
        return <h2>Service not found</h2>;
    }
    const serviceIcons = {
       Electrician: "🔌",
       Plumber: "🔧",
       Carpenter: "🪚",
       Painter: "🎨",
       Cleaner: "🧹",
      "AC Technician": "❄️",
      "Pest Control": "🐜",
       "Appliance Repair": "🛠️",
    };

const icon = serviceIcons[service.category] || "🏠";

    return(
        <div className="container">
            <div className="card">
                <div className="icon">{icon}</div>
                  <p className="service-type">Home Service</p>
                  <h1>{service.name}</h1>
                  <p><strong>Category:</strong>{service.category}</p>
                  <h2>₹{service.price}</h2> 
                  <h2>⭐{service.rating}</h2>         
                  <p className="description"><b>About this Service:</b> {service.description}</p>
                  <button onClick={handleBookNow}>Book Now</button>
            </div>
        </div>
    );
}
export default ServiceDetails;