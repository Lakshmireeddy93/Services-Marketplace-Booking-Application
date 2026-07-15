import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFoundPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Sorry, we couldn't find that page.</p>
        <Link to="/services" className="primary-button">
          Back to Services
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
