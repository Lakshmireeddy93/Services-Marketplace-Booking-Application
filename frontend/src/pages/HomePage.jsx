import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";
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

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line" style={{ width: "70%" }} />
        <div className="skeleton skeleton-line" style={{ width: "90%" }} />
        <div className="skeleton skeleton-line" style={{ width: "50%" }} />
      </div>
    </div>
  );
}

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="home-page">
        <div className="hero page-fade">
          <div className="hero-left">
            <span className="home-badge">Trusted Local Professionals</span>

            <h1>
              Find <span className="highlight">trusted</span> local help,{" "}
              <span className="highlight">faster.</span>
            </h1>

            <p className="hero-subtitle">
              Book electricians, plumbers, painters and 10+ more professionals
              at your doorstep — in just a few clicks.
            </p>

            <div className="home-actions">
              <Link to={user ? "/services" : "/register"} className="btn-primary">
                Explore Services →
              </Link>
              {!user && (
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
              )}
            </div>


          </div>

          <div className="hero-right">
            <img src="/logo.png" alt="Service Marketplace" />
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-section-header">
          <div>
            <h2>Available Services</h2>
            <p>Everything you need — at your doorstep</p>
          </div>
          <Link to={user ? "/services" : "/login"} className="section-see-all">
            See all →
          </Link>
        </div>

        <div className="services-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : services.length === 0
              ? <p style={{ color: "#8a8aaa", gridColumn: "1/-1" }}>No services found.</p>
              : services.map((service) => (
                <div
                  className="service-card"
                  key={service._id}
                  onClick={() => {
                    if (user) navigate(`/services/${service._id}`);
                    else navigate("/login", { state: { service } });
                  }}
                >
                  <img
                    src={categoryImages[service.category] || "/images/default.jpg"}
                    alt={service.category}
                    className="service-image"
                  />
                  <div className="service-card-body">
                    <h3>{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                    <div className="service-footer">
                      <span className="service-price">₹{service.price}</span>
                      <span className="service-rating">⭐ {service.rating}</span>
                      <button
                        className="service-book-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user) navigate(`/services/${service._id}`);
                          else navigate("/login", { state: { service } });
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;