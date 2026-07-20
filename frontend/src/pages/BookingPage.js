import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function BookingPage() {
  const location = useLocation();
  const service = location.state;

  if (!service) {
    return <Navigate to="/services" />;
  }

  return <BookingForm service={service} />;
}

export default BookingPage;
