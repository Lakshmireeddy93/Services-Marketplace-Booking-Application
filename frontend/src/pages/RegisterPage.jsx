import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import "../styles/Auth.css";

function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0-4
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthKeys = ["", "weak", "fair", "good", "strong"];

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setToast({ message: "Passwords do not match", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/register", { name, email, password });
      setToast({ message: "Registration successful!", type: "success" });
      setTimeout(() => navigate("/login", { state: location.state }), 1000);
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
      setToast({ message, type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="auth-container page-fade">
        <div className="auth-logo">
          <img src="/logo.png" alt="Services Marketplace" />
        </div>

        <h2>Create account</h2>
        <p className="auth-subtitle">Join thousands of happy customers</p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {loading && <Spinner message="Creating account..." />}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <div className="password-wrapper">
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {password && (
              <>
                <div className="strength-bar-wrap">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className={`strength-seg ${seg <= strength ? strengthKeys[strength] : ""}`}
                    />
                  ))}
                </div>
                <div className="strength-label">{strengthLabels[strength]}</div>
              </>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm">Confirm Password</label>
            <div className="password-wrapper">
              <input
                id="reg-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" state={location.state}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;