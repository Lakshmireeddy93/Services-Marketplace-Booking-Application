import { useNavigate } from "react-router-dom";
import React from "react";

function ServiceCard({ service }) {

  const navigate = useNavigate();

  function openDetails() {
    alert("Electrician clicked");
    console.log("Clicked service:", service);

    navigate(`/services/${service._id}`);
  }

  return (
    <div 
      className="service-card"
      onClick={openDetails}
    >
      <h3>{service.name}</h3>
      <p>{service.category}</p>
    </div>
  );
}

export default ServiceCard;