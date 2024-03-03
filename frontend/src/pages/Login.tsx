import img from "../assets/signup-page-image.jpg";
import Button from "../components/Button";
import "./styles/signup.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={img} />
      </div>
      <div className="main-container">
        <p className="lower-heading">Welcome Back!</p>
        <form>
          <input placeholder="Username" name="username" type="text" />
          <input placeholder="Password" name="password" type="password" />
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
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="second-sp">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
