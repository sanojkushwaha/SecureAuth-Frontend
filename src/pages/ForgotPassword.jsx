import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authService";
import Alert from "../components/Alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Forgot password?</h1>
        <p className="subtitle">Enter your email and we'll send you a reset link.</p>

        <Alert type="error" message={error} />
        <Alert type="success" message={message} />

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="switch-link">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
