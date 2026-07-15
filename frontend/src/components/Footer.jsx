import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span>Services Marketplace</span>
          <p>Connecting you with trusted local professionals.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/register">Register</a>
        </div>
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Services Marketplace. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;