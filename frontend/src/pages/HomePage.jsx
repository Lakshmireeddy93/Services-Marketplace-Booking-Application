import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Painter:"/images/painter.jpg",
};


function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("/api/services")
    .then((res) => {
      console.log("Status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Received data:", data);
      console.log("Is Array?", Array.isArray(data));

      setServices(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <>
     <div className="home-page">
        <div className="hero">
          <div className="hero-left">
            <span className="home-badge">Trusted Local Professionals</span>

            <h1>Find the trusted local help you need, faster.</h1>

            <p>
              Book electricians, plumbers, painters and many more trusted
              professionals in just a few clicks.
            </p>
            <h2><strong>Home services at your doorstep
            </strong></h2>
            <p><strong>Checkout our Services below</strong></p>
          </div>

          <div className="hero-right">
            <img src="/logo.png" alt="Services" />
          </div>
        </div>
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
                <button className="primary-button" onClick={() => {
                  if (user) {
                     navigate(`/services/${service._id}`);
                  }  else {
                      navigate("/login", {
                      state: { service },
                      });
                     }
                  }}
                  >Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </>
  );
}

export default HomePage;