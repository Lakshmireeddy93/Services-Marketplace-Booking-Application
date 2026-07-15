import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import"./ServiceDetails.css";
import axios from "axios";
function ServiceDetails(){
    const navigate=useNavigate();
    const{id}=useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const[error, setError]= useState("");
    useEffect(()=>{
        fetchService();
    },[]);
    async function fetchService(){
        try{
            const response = await axios.get(`https://localhost:5000/api/services/${id}`);
            setService(response.data);
        }
        catch (error){
            setError("Unable to load service.");
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    function handleBookNow(){
        navigate("/booking", {
            //sending selected service to booking page
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

    return(
        <div className="container">
            <div className="card">
                <div className="icon">🔌</div>
                  <p className="service-type">Home Service</p>
                  <h1>{service.name}</h1>
                  <p><strong>Category:</strong>{service.category}</p>
                  <h2>₹{service.price}</h2>        
                  <p className="description"><b>About this Service:</b> {service.description}</p>
                  <button onClick={handleBookNow}>Book Now</button>
            </div>
        </div>
    );
}
export default ServiceDetails;