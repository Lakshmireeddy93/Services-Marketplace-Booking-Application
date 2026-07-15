import { useState, useEffect, } from "react";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";
import Spinner from "../components/Spinner";
import "../styles/Services.css";

function ServicesPage() {
  const [services, setServices] = useState([]);
  console.log("Services from API:", services);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
       const response = await api.get("/services");
        setServices(response.data);
      } catch (err) {
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = categoryFilter
    ? services.filter((s) => s.category === categoryFilter)
    : services;

  if (loading) return <Spinner message="Fetching services..." />;

  return (
    <div className="services-container page-fade">
      <div className="services-header">
        <h2>Available Services</h2>
        <p className="services-subtitle">
          Explore our curated list of trusted service providers and book the one
          that fits your needs.
        </p>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="filter-bar">
        <label htmlFor="category-select">Filter by category:</label>
        <select
          id="category-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Painter">Painter</option>
        </select>
      </div>

      <div className="service-grid">
        {filteredServices.length === 0 ? (
          <p>No services found.</p>
        ) : (
          filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        )}
      </div>
    </div>
  );
}


export default ServicesPage;