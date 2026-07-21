import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Spinner from "../components/Spinner";
import "../styles/Services.css";

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

const ALL_CATEGORIES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Cleaner",
  "AC Technician",
  "Pest Control",
  "Appliance Repair",
  "Women's Salon & Spa",
  "Men's Salon & Massage",
  "Painter",
];

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredServices = services.filter((s) => {
    const matchCategory = categoryFilter ? s.category === categoryFilter : true;
    const matchSearch = searchQuery
      ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCategory && matchSearch;
  });

  if (loading) return <Spinner message="Fetching services..." />;

  return (
    <div className="services-page">
      <div className="services-container page-fade">
        <div className="services-header">
          <h2>Available Services</h2>
          <p className="services-subtitle">
            Explore our curated list of trusted professionals and book the one that fits your needs.
          </p>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="filter-bar">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search services…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="service-grid">
          {filteredServices.length === 0 ? (
            <div className="empty-state">
              <span>🔍</span>
              <p>No services found</p>
            </div>
          ) : (
            filteredServices.map((service, idx) => (
              <ServiceCardNew
                key={service._id}
                service={service}
                delay={idx * 60}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceCardNew({ service, delay }) {
  const navigate = useNavigate();

  return (
    <div
      className="srv-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/services/${service._id}`)}
    >
      <img
        src={categoryImages[service.category] || "/images/default.jpg"}
        alt={service.category}
        className="srv-card-img"
      />
      <div className="srv-card-body">
        <span className="srv-category-pill">{service.category}</span>
        <h3>{service.name}</h3>
        <p className="srv-description">{service.description}</p>
        <div className="srv-footer">
          <span className="srv-price">₹{service.price}</span>
          {service.rating && (
            <span className="srv-rating">⭐ {service.rating}</span>
          )}
          <button
            className="srv-book-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/services/${service._id}`);
            }}
          >
            View & Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;