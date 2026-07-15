import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page page-fade">
      <div className="home-hero">
        <div className="home-card">
          <span className="home-badge">Services Marketplace</span>
          <h1>Find the trusted local help you need, faster.</h1>
          <p className="home-copy">
            Discover the best service providers in your area, compare options, and
            book work with confidence.
          </p>
          <div className="home-actions">
            {user ? (
              <Link to="/services" className="primary-button">
                Browse Services
              </Link>
            ) : (
              <>
                <Link to="/login" className="primary-button">
                  Login
                </Link>
                <Link to="/register" className="secondary-button">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="home-hero-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyekbtH7scpPrLStGinB7U6vVtiMB8E4kQ86tL5TbcWQ&s=10"
            alt="Home service professional"
          />
        </div>
      </div>

      <div className="promo-banner">
        <div className="promo-content">
          <span className="promo-tag">Limited Time</span>
          <h2>Get 20% off your first booking</h2>
          <p>Book any verified service professional and save on your first order.</p>
        </div>
        <Link to={user ? "/services" : "/register"} className="promo-button">
          Claim Offer
        </Link>
      </div>
    </div>
  );
}

export default HomePage;