// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
