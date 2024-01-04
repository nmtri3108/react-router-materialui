import axios from "axios";

const BASEURL = "http://localhost:5152/api";

export const User = {
  login,
  register,
  verifyEmail,
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
