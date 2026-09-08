import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  function login({ accessToken, refreshToken, fullName, email, role, userId }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUser({ fullName, email, role, id: userId });
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
