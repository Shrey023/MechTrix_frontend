import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  // 👈 must match backend
  withCredentials: false,
});

export default instance;
