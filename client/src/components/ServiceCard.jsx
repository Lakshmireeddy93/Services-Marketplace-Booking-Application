import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px",
        width: "250px",
      }}
    >
      <h3>{service.name}</h3>
      <p style={{ color: "#666" }}>{service.category}</p>
      <p>{service.description}</p>
      <Link to={`/services/${service._id}`}>
        <button style={{ padding: "8px 16px" }}>View Details</button>
      </Link>
    </div>
  );
}

export default ServiceCard;