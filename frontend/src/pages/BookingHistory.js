import { getBookings } from "../services/bookingService";
import React, { useState, useEffect } from "react";
import "../styles/BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="bookinghistory">
        <div className="bh-loading">⏳ Loading your bookings…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookinghistory">
        <div className="bh-error">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="bookinghistory page-fade">
      <h2>My Bookings</h2>
      <p className="bh-subtitle">All your service bookings in one place</p>

      {bookings.length === 0 ? (
        <div className="bh-empty">
          <span>📋</span>
          <p>No bookings yet</p>
          <small>Your bookings will appear here once you book a service.</small>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => (
            <BookingHistoryCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingHistoryCard({ booking }) {
  const statusClass = booking.status?.toLowerCase() || "pending";

  return (
    <div className="booking-card">
      <div className="booking-card-top">
        <h2>{booking.service?.name || "Service"}</h2>
        <span className={`booking-status ${statusClass}`}>
          {booking.status || "Pending"}
        </span>
      </div>
      <div className="booking-card-body">
        <div className="bk-info-row">
          <strong>Name</strong>
          <span>{booking.name}</span>
        </div>
        <div className="bk-info-row">
          <strong>Phone</strong>
          <span>{booking.phone}</span>
        </div>
        <div className="bk-info-row">
          <strong>Address</strong>
          <span>{booking.address}</span>
        </div>
        <div className="bk-info-row">
          <strong>Date</strong>
          <span>
            {new Date(booking.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="bk-info-row">
          <strong>Time</strong>
          <span>{booking.time}</span>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;