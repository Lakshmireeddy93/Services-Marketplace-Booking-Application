import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

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
};

function HomePage() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="intro-banner">
        <h1>Home services at your doorstep</h1>
        <img src="/images/logo.jpg" alt="Services Marketplace" />
      </div>

      <div className="services-section">
        <h2>Available Services</h2>

        {loading && <p>Loading services...</p>}
        {!loading && services.length === 0 && <p>No services found.</p>}

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service._id}>
              <img
                src={categoryImages[service.category] || "/images/default.jpg"}
                alt={service.category}
                className="service-image"
              />
              <h3>{service.name}</h3>
              <span className="service-category">{service.category}</span>
              <p className="service-description">{service.description}</p>
              <div className="service-footer">
                <span className="service-price">₹{service.price}</span>
                <Link className="primary-button" to="/services">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-page">
        <div className="hero">
          <div className="hero-left">
            <span className="home-badge">Trusted Local Professionals</span>

            <h1>Find the trusted local help you need, faster.</h1>

            <p>
              Book electricians, plumbers, painters and many more trusted
              professionals in just a few clicks.
            </p>

            <div className="home-actions">
              {user ? (
                <Link className="primary-button" to="/services">
                  Browse Services
                </Link>
              ) : (
                <>
                  <Link className="primary-button" to="/login">
                    Login
                  </Link>
                  <Link className="secondary-button" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hero-right">
            <img src="/logo.png" alt="Services" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;