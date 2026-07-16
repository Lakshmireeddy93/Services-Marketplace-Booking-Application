import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  function openDetails() {
    navigate(`/services/${service._id}`);
  }

  function handleBookClick(e) {
    e.stopPropagation();
    navigate(`/services/${service._id}`);
  }

  return (
    <div className="service-card" onClick={openDetails}>
      <span className="service-category">{service.category}</span>
      <h3>{service.name}</h3>
      <p className="service-description">{service.description}</p>
      <p style={{ fontWeight: 700, color: "#4c1d95", marginBottom: "12px" }}>
        ₹{service.price}
      </p>
      <button onClick={handleBookClick}>View & Book</button>
    </div>
  );
}

export default ServiceCard;