import { useState } from "react";
import img from "../assets/signup-page-image.jpg";
import Button from "../components/Button";
import "./styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../services/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setLoginError, clearLoginError } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const loginError = useSelector((state) => state.user.loginError);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(setLoginError("Incorrect username or password")); // Dispatch login error message
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear login error when user starts typing
    dispatch(clearLoginError());
  };

  return (
    <>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>} {/* Display login error message */}
      <div className="container">
        <div className="image-container">
          <img src={img} alt="Signup Page" />
        </div>
        <div className="main-container">
          <p className="lower-heading">Welcome Back!</p>
          <form onSubmit={handleLogin}>
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
            <Button
              type={"submit"}
              title={"Login"}
              backColor={"#249329"}
              color={"#FFFFFF"}
            />
          </form>
          <span className="alternate">
            <div className="line"></div>
            <p>or login with</p>
            <div className="line"></div>
          </span>
          <div className="options">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
          </div>
          <p className="alternative-paragraph">
            <span className="first-sp">Don't have an account?</span>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="second-sp">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
