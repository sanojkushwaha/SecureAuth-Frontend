import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authService";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (err) {
      // Even if the server call fails, clear local session
    }
    logout();
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <span className="brand">SecureAuth</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome, {user?.fullName}</h1>
        <div className="profile-card">
          <div className="profile-row">
            <span className="label">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="profile-row">
            <span className="label">Role</span>
            <span className="badge">{user?.role}</span>
          </div>
          <div className="profile-row">
            <span className="label">User ID</span>
            <span>{user?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
