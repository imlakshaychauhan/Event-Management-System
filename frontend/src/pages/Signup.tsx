import img from "../assets/signup-page-image.jpg";
import Button from "../components/Button";
import "./styles/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={img} />
      </div>
      <div className="main-container">
        <p className="lower-heading">Let's get Started!</p>
        <form>
          <input placeholder="Name" name="name" type="text" />
          <input placeholder="Username" name="username" type="text" />
          <input placeholder="Password" name="password" type="password" />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Button
            type={"submit"}
            title={"Sign Up"}
            backColor={"#249329"}
            color={"#FFFFFF"}
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
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="second-sp">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
