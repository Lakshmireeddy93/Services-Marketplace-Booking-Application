import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "../styles/BookingSuccess.css";

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state;

  if (!booking) {
    return <Navigate to="/services" />;
  }

  return (
    <div className="success-page">
      <div className="success-card page-fade">
        <span className="success-icon">🎉</span>

        <h1>Booking Confirmed!</h1>
        <p>Your service has been booked successfully. We'll be there soon!</p>

        <hr className="success-divider" />

        <div className="success-details">
          <div className="success-row">
            <strong>Booking ID</strong>
            <span style={{ fontSize: "12px", color: "#8a8aaa" }}>{booking._id}</span>
          </div>
          <div className="success-row">
            <strong>Status</strong>
            <span className="success-status">
              {booking.status || "Confirmed"}
            </span>
          </div>
          <div className="success-row">
            <strong>Date</strong>
            <span>{new Date(booking.date).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric"
            })}</span>
          </div>
          <div className="success-row">
            <strong>Time</strong>
            <span>{booking.time}</span>
          </div>
        </div>

        <div className="success-actions">
          <button
            className="success-btn-primary"
            onClick={() => navigate("/booking-history")}
          >
            View My Bookings →
          </button>
          <button
            className="success-btn-secondary"
            onClick={() => navigate("/services")}
          >
            Book Another Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;