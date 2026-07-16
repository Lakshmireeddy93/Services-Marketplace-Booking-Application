import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <img src="/logo.png" alt="Logo" />

          <div>
            <span>Services Marketplace</span>

            <p>
              Connecting you with trusted local professionals.
            </p>
          </div>
        </div>

      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} Services Marketplace. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;