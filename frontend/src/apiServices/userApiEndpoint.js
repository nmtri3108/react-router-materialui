import axios from "axios";

const BASEURL = "http://localhost:5152/api";

export const User = {
  login,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
};

function login(payload) {
  return axios.post(`${BASEURL}/Users/authenticate`, payload);
}

function register(payload) {
  return axios.post(`${BASEURL}/Users/register`, payload);
}

function verifyEmail(payload) {
  return axios.post(`${BASEURL}/Users/verify-email`, payload);
}

function forgotPassword(email) {
  return axios.post(`${BASEURL}/Users/forgot-password`, { email });
}

function validateResetToken(token) {
  return axios.post(`${BASEURL}/Users/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
  return axios.post(`${BASEURL}/Users/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}
