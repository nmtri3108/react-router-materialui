import axios from "axios";

const BASEURL = "http://localhost:5152/api";

export const Shirt = {
  get,
  post,
  put,
  getById,
  _delete,
};

function get() {
  return axios.get(`${BASEURL}/Shirts`);
}

function post(data, token) {
  return axios.post(`${BASEURL}/Shirts`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function getById(id, token) {
  return axios.get(`${BASEURL}/Shirts/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

function put(id, data, token) {
  return axios.put(`${BASEURL}/Shirts/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
}

function _delete(id, token) {
  return axios.delete(`${BASEURL}/Shirts/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
