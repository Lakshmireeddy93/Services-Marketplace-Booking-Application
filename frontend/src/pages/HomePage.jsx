import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">

      <div className="hero">

        <div className="hero-left">

          <span className="home-badge">
            Trusted Local Professionals
          </span>

          <h1>
            Find the trusted local help you need, faster.
          </h1>

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

          <img
            src="/logo.png"
            alt="Services"
          />

        </div>

      </div>

    </div>
  );
}

export default HomePage;