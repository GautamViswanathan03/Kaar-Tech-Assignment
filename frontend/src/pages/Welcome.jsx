import { useLocation, useNavigate } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="card">
        <h1>Welcome to Kaar Tech</h1>
        <p className="subtitle">No registration data found.</p>
        <button onClick={() => navigate("/")}>Go to Registration</button>
      </div>
    );
  }

  const { username, email, hashedPassword } = data;

  return (
    <div className="card">
      <h1>Welcome to Kaar Tech</h1>
      <p className="subtitle">You have registered successfully.</p>
      <div className="info-grid">
        <div className="info-item">
          <span className="label-text">Username</span>
          <span className="value">{username}</span>
        </div>
        <div className="info-item">
          <span className="label-text">Email</span>
          <span className="value">{email}</span>
        </div>
        <div className="info-item">
          <span className="label-text">Hashed Password</span>
          <span className="value mono">{hashedPassword}</span>
        </div>
      </div>
      <button onClick={() => navigate("/")}>Register Another</button>
    </div>
  );
}

export default Welcome;


