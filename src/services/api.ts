import axios from "axios";

const api = axios.create({
  baseURL: process.env.ANKIT_API_URL,
});

export default api;
