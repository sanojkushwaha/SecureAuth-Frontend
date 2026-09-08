import api from "./axiosConfig";

export const registerUser = (payload) => api.post("/auth/register", payload);

export const loginUser = (payload) => api.post("/auth/login", payload);

export const verifyEmail = (token) =>
  api.get(`/auth/verify-email`, { params: { token } });

export const forgotPassword = (payload) =>
  api.post("/auth/forgot-password", payload);

export const resetPassword = (payload) =>
  api.post("/auth/reset-password", payload);

export const logoutUser = () => api.post("/auth/logout");

export const getCurrentUser = () => api.get("/user/me");
