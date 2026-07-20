import { useState, useEffect } from "react";
import { useNavigate, Link , useLocation} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import "../styles/Auth.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const savedToast = sessionStorage.getItem("toast");

    if (savedToast) {
      setToast(JSON.parse(savedToast));
      sessionStorage.removeItem("toast");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      login(response.data.user, response.data.token);

      setToast({
        message: "Login successful!",
        type: "success",
      });

      setTimeout(() => {
        if (location.state?.service) {
          navigate(`/services/${location.state.service._id}`, {
            state: location.state.service,
          });
        } else {
            navigate("/");
          }
      }, 1000);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please try again.";

      setError(message);

      setToast({
        message,
        type: "error",
      });

      setLoading(false);
    }
  };

  return (
    <div className="auth-container page-fade">
      
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />

      <h2>Login</h2>

      {error && <p className="auth-error">{error}</p>}

      {loading && <Spinner message="Signing in..." />}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
       <Link to="/register" state={location.state}>
        Register here</Link>
      </p>
    </div>
    
  );
}

export default LoginPage;