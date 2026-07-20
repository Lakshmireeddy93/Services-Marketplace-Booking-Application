import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookingForm.css";

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

function BookingForm({ service }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !phone || !address || !date || !time) {
      alert("Please fill all the details.");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

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

      navigate("/booking-success", { state: response.data });
    } catch (error) {
      alert("Booking Failed. Please try again.");
      setSubmitting(false);
    }
  }

  const imgSrc = categoryImages[service.category];
  const icon = serviceIcons[service.category] || "🏠";

  return (
    <div className="booking-page">
      <div className="booking-layout page-fade">

        {/* ---- LEFT PANEL — Service Info ---- */}
        <div className="booking-info-panel">
          {/* Service image or emoji */}
          <div className="bk-img-wrap">
            {imgSrc ? (
              <img src={imgSrc} alt={service.category} className="bk-service-img" />
            ) : (
              <div className="bk-service-emoji">{icon}</div>
            )}
          </div>

          <div className="bk-info-content">
            <span className="bk-category-pill">{service.category}</span>
            <h2 className="bk-service-name">{service.name}</h2>
            <p className="bk-service-desc">{service.description}</p>

            <div className="bk-meta">
              <div className="bk-meta-item">
                <span className="bk-meta-label">Price</span>
                <span className="bk-meta-value">₹{service.price}</span>
              </div>
              {service.rating && (
                <div className="bk-meta-item">
                  <span className="bk-meta-label">Rating</span>
                  <span className="bk-meta-value">⭐ {service.rating} / 5</span>
                </div>
              )}
            </div>

            <div className="bk-trust-badges">
              <span className="bk-badge">Verified Professional</span>
              <span className="bk-badge">Insured Service</span>
              <span className="bk-badge">Same-day Available</span>
            </div>
          </div>
        </div>

        {/* ---- RIGHT PANEL — Booking Form ---- */}
        <form className="booking-form-panel" onSubmit={handleSubmit}>
          <h2 className="bk-form-title">Book This Service</h2>
          <p className="bk-form-subtitle">Fill in your details and we'll confirm shortly.</p>

          {/* Name + Phone side by side */}
          <div className="bk-row">
            <div className="bk-form-group">
              <label htmlFor="bk-name">Your Name</label>
              <input
                id="bk-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="bk-form-group">
              <label htmlFor="bk-phone">Phone Number</label>
              <input
                id="bk-phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address full width */}
          <div className="bk-form-group">
            <label htmlFor="bk-address">Service Address</label>
            <textarea
              id="bk-address"
              placeholder="Enter your full address (house no, street, city…)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Date + Time side by side */}
          <div className="bk-row">
            <div className="bk-form-group">
              <label htmlFor="bk-date">Preferred Date</label>
              <input
                id="bk-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="bk-form-group">
              <label htmlFor="bk-time">Preferred Time</label>
              <input
                id="bk-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="bk-submit-btn" disabled={submitting}>
            {submitting ? "Processing..." : "Confirm Booking →"}
          </button>

          <p className="bk-secure-note">Your data is encrypted and secure</p>
        </form>

      </div>
    </div>
  );
}

export default BookingForm;