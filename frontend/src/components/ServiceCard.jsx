import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p className="service-category">{service.category}</p>
      <p className="service-description">{service.description}</p>
      <Link to={`/services/${service._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ServiceCard;