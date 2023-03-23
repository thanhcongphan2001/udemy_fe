import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
instance.defaults.withCredentials = true;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = err.response?.status || 500;
    console.log(status);
    switch (status) {
      // authentication (token related issues)
      case 401: {
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          toast.error("unauthorized the user , Please login");
        }

        return err.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("you dont have permission to access this resource");
        return Promise.reject(err);
      }

      // bad request
      case 400: {
        return Promise.reject(err);
      }

      // not found
      case 404: {
        return Promise.reject(err);
      }

      // conflict
      case 409: {
        return Promise.reject(err);
      }

      // unprocessable
      case 422: {
        return Promise.reject(err);
      }

      // generic api error (server related) unexpected
      default: {
        if (window.location.pathname !== "/") {
          toast.error("500 server die");
        }

        return null;
      }
    }
  }
);
export default instance;
