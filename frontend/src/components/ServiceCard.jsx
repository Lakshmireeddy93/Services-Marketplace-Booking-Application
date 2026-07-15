import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  function openDetails() {
    navigate(`/services/${service._id}`);
  }

  return (
    <div className="service-card" onClick={openDetails}>
      <h3>{service.name}</h3>
      <p>{service.category}</p>
    </div>
  );
}

export default ServiceCard;