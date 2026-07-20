import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.setItem(
      "toast",
      JSON.stringify({
        message: "Logged out successfully!",
        type: "success",
      })
    );
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <h2>Services Marketplace</h2>
      </Link>

      {/* Mobile hamburger */}
      <button
        className="navbar-hamburger"
        onClick={() => setNavOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-links${navOpen ? " open" : ""}`}>
        <Link to="/" onClick={() => setNavOpen(false)}>Home</Link>

        {user ? (
          <>
            <Link to="/services" onClick={() => setNavOpen(false)}>Services</Link>
            <Link to="/booking-history" onClick={() => setNavOpen(false)}>My Bookings</Link>

            <div className="navbar-user-menu">
              <button
                className="navbar-avatar"
                onClick={() => setMenuOpen((open) => !open)}
                title={user.name}
              >
                {initials}
              </button>

              {menuOpen && (
                <div className="navbar-dropdown">
                  <span className="navbar-dropdown-name">{user.name}</span>
                  <button onClick={handleLogout} className="navbar-logout">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn-login" onClick={() => setNavOpen(false)}>Login</Link>
            <Link to="/register" className="navbar-btn-register" onClick={() => setNavOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;