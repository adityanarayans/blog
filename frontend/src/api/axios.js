
import axios from "axios";

const api =  axios.create({
  baseURL : "https://blog-backends-wth3.onrender.com"
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);




api.interceptors.response.use(
  (response) => response,   // success → just return response
  (error) => {
    if (error.response?.status === 401) {
      // Token expired / invalid
      localStorage.removeItem("token");
      window.location.href = "/login";   // redirect to login
    }

     return Promise.reject(error);
  }
);

export default api;




