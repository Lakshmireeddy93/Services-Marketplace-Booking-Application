import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img src="/logo.png" alt="Logo" />
            <span className="footer-brand-name">Services Marketplace</span>
          </div>
          <p className="footer-brand-tagline">
            Connecting you with trusted local professionals for every home service need — quickly, reliably, and affordably.
          </p>

        </div>

        {/* Services column */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/">Electrician</Link></li>
            <li><Link to="/">Plumber</Link></li>
            <li><Link to="/">Carpenter</Link></li>
            <li><Link to="/">AC Technician</Link></li>
            <li><Link to="/">Painter</Link></li>
          </ul>
        </div>

        {/* Company column */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">All Services</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/booking-history">My Bookings</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Services Marketplace. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;