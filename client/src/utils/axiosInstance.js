import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api/user", // Uses Vite proxy (http://localhost:7000)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token
axiosInstance.interceptors.request.use(
  function (request) {
    let token = localStorage.getItem("token");
    console.log("token available in axios instance", token);

    if (token) {
      token = token.replace(/^"|"$/g, ""); // ✅ Remove extra double quotes
      console.log("Token being sent after trimming:", token);

      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage");
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token-related errors
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("an error in axiosInstance", error);

    return Promise.reject(
      error.response
        ? error.response
        : { data: { message: "An unknown error occurred in axios instance" } }
    );
  }
);

export default axiosInstance;
