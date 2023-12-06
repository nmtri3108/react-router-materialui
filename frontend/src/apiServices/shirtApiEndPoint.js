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

function post(data) {
  return axios.post(`${BASEURL}/Shirts`, data);
}

function getById(id) {
  return axios.get(`${BASEURL}/Shirts/${id}`);
}

function put(id, data) {
  return axios.put(`${BASEURL}/Shirts/${id}`, data);
}

function _delete(id) {
  return axios.delete(`${BASEURL}/Shirts/${id}`);
}
