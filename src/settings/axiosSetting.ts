import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5002/api/",
});

export const axiosInstance1: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5002/",
  withCredentials: true,
});


export const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5002/api/",
  withCredentials: true
});

// Add an interceptor to handle requests
axiosAuthInstance.interceptors.request.use(
  (config) => {
    // Check if "Bearer" header is present
    if (!config.headers["Authorization"]) {
      // Retrieve token from local storage
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")?.replace(/^b'|'$/g, "");
        // Set the token in the headers
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["X-Requested-With"] = "XMLHttpRequest";
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
