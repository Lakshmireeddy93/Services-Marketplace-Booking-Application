import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page page-fade">
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
    </div>
  );
}

export default HomePage;
