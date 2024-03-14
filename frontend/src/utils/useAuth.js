import { useEffect } from "react";
import { loginUser } from "../services/loginService";
import { decodeToken } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedInTrue,
  setIsLoggedInFalse,
  setLoginError,
} from "./userSlice";
import { registerUser } from "../services/userService";

const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Check token expiration only when the user is logged in
    if (isLoggedIn) {
      const checkTokenExpiration = () => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = decodeToken(token);
          const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
          const currentTime = Date.now();

          // Check if the token has expired
          if (currentTime >= expirationTime) {
            logout(); // Token has expired, log the user out
          }
        }
      };

      // Call the function initially
      checkTokenExpiration();

      // Set up a timer to periodically check the token expiration
      const timer = setInterval(() => {
        checkTokenExpiration();
      }, 1000); // Check every second

      // Clean up the timer on component unmount
      return () => clearInterval(timer);
    }
  });

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(setIsLoggedInTrue());
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(setLoginError("Incorrect username or password")); // Set login error message
    }
  };

  const signup = async (userData) => {
    try {
      const res = await registerUser(userData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      dispatch(setIsLoggedInTrue());
    } catch (err) {
      console.error("Signup failed:", err);
      dispatch(setLoginError("Incorrect Credentials!")); // Set signup error message
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setIsLoggedInFalse());
  };

  return { login, logout, signup };
};

export default useAuth;
