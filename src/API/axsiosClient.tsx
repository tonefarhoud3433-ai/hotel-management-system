import axios from "axios";

export const API_BASE_URL = "https://upskilling-egypt.com:3000";

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v0/admin/users`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);

  }
);

axiosClient.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    
    return Promise.reject(error)
  }
);

export default axiosClient;