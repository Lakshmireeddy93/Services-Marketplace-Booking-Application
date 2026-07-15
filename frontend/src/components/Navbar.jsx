import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "./Toast";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setToast({ message: "Logged out successfully", type: "success" });

    setTimeout(() => {
      navigate("/login");
    }, 800);
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
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
      <Link to="/" className="navbar-brand">
        Services Marketplace
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/services">Services</Link>
            <Link to="/bookings">My Bookings</Link>
            <div className="navbar-user-menu">
              <button
                className="navbar-avatar"
                onClick={() => setMenuOpen((open) => !open)}
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
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;