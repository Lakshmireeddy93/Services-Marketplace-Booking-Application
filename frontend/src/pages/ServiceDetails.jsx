import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ServiceDetails.css";
import api from "../services/api";

const categoryImages = {
  Electrician: "/images/electrician.jpg",
  Plumber: "/images/plumber.jpg",
  Carpenter: "/images/carpenter.jpg",
  Cleaner: "/images/cleaner.jpg",
  "AC Technician": "/images/airconditinor.jpg",
  "Pest Control": "/images/pestcontrol.jpg",
  "Appliance Repair": "/images/appliancerepair.jpg",
  "Women's Salon & Spa": "/images/womenspa.jpg",
  "Men's Salon & Massage": "/images/mensalon.jpg",
  Painter: "/images/painter.jpg",
};

const serviceIcons = {
  Electrician: "🔌",
  Plumber: "🔧",
  Carpenter: "🪚",
  Painter: "🎨",
  Cleaner: "🧹",
  "AC Technician": "❄️",
  "Pest Control": "🐜",
  "Appliance Repair": "🛠️",
  "Women's Salon & Spa": "💆",
  "Men's Salon & Massage": "💈",
};

function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchService();
  }, []);

  async function fetchService() {
    try {
      const response = await api.get(`/services/${id}`);
      setService(response.data);
    } catch (err) {
      setError("Unable to load service.");
    } finally {
      setLoading(false);
    }
  }

  function handleBookNow() {
    navigate("/booking", { state: service });
  }

  if (loading) {
    return (
      <div className="details-loading">
        <span>⏳</span>
        Loading service…
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error">
        <span>⚠️</span>
        {error}
      </div>
    );
  }

  if (!service) {
    return (
      <div className="details-error">
        <span>🔍</span>
        Service not found
      </div>
    );
  }

  const imgSrc = categoryImages[service.category];
  const icon = serviceIcons[service.category] || "🏠";

  return (
    <div className="details-page">
      <div className="details-card page-fade">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={service.category}
            className="details-img"
          />
        ) : (
          <div className="details-img-placeholder">{icon}</div>
        )}

        <div className="details-body">
          <span className="details-category-pill">{service.category}</span>

          <h1>{service.name}</h1>

          <div className="details-meta">
            <span className="details-price">₹{service.price}</span>
            {service.rating && (
              <span className="details-rating">⭐ {service.rating} / 5</span>
            )}
          </div>

          <p className="details-description">{service.description}</p>

          <button className="details-book-btn" onClick={handleBookNow}>
            Book This Service →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;