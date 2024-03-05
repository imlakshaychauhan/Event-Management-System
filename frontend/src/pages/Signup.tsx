import { useState } from "react";
import img from "../assets/signup-page-image.jpg";
import Button from "../components/Button";
import "./styles/signup.css";
import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {setLoginError} from "../utils/userSlice";

const Signup = () => {
  const { signup } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);

  // States for form inputs
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      setFormData({...formData, password: "", confirmPassword: ""});
      return;
    }
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setFormData({...formData, password: "", confirmPassword: ""});
      return;
    }
    // Clear password error if validation passes
    setPasswordError("");
    // Call signup function if password validation passes
    try {
      await signup(formData);
    }
    catch(err) {
      dispatch(setLoginError("Incorrect username or password")); // Dispatch login error message
    }
    // Clear form data after signup
    setFormData({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container">
      {loginError && <p style={{ color: "red" }}>{loginError}</p>} {/* Display login error message */}
      <div className="image-container">
        <img src={img} alt="Signup" />
      </div>
      <div className="main-container">
        <p className="lower-heading">Let's get Started!</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

          <Button
            type="submit"
            title="Sign Up"
            backColor="#249329"
            color="#FFFFFF"
          />
        </form>
        <span className="alternate">
          <div className="line"></div>
          <p>or register with</p>
          <div className="line"></div>
        </span>
        <div className="options">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <p className="alternative-paragraph">
          <span className="first-sp">Already have an account?</span>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="second-sp">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
