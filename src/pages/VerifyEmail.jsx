import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/authService";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    verifyEmail(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed.");
      });
  }, [token]);

  return (
    <div className="auth-page">
      <div className="auth-card center-text">
        {status === "verifying" && <h1>Verifying your email...</h1>}
        {status === "success" && (
          <>
            <h1>Email Verified</h1>
            <p className="subtitle">{message}</p>
            <Link to="/login" className="button-link">
              Go to Login
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1>Verification Failed</h1>
            <p className="subtitle">{message}</p>
            <Link to="/login" className="button-link">
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
