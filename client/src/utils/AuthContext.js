// // context/AuthContext.js
// import { createContext, useState, useContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/v1/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       setToken(response.data.token);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const logout = () => {
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
