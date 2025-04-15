import axios from "axios";
import { HOST } from "../constants";

import store from "../store";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: HOST, // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or any state management solution
    const storeData = store.getState();
    const token = storeData?.userReducer?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
