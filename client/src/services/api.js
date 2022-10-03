import axios from "axios";
// Envs
const { REACT_APP_API_URL: API_URL } = process.env;

const accessToken = localStorage.getItem("accessToken");

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default instance;
