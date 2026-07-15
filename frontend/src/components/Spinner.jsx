import "../styles/Spinner.css";

function Spinner({ message = "Loading..." }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" aria-label="Loading"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
}

export default Spinner;
