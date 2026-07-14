import { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services");
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

  if (loading) return <p style={{ textAlign: "center" }}>Loading services...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 20px" }}>
      <h2>Available Services</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter by category: </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "6px" }}
        >
          <option value="">All</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
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