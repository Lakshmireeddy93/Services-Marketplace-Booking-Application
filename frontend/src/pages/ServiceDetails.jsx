import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/ServiceDetails.css";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await api.get(`/services/${id}`);
      setService(response.data);
    } catch (err) {
      setError("Unable to load service.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate("/booking", {
      state: service,
    });
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!service) return <h2>Service not found</h2>;

  return (
    <div className="container">
      <div className="card">
        <h1>{service.name}</h1>

        <p>
          <strong>Category:</strong> {service.category}
        </p>

        <p>
          <strong>Price:</strong> ₹{service.price}
        </p>

        <p>
          <strong>Description:</strong> {service.description}
        </p>

        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
}

export default ServiceDetails;