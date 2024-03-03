import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import "./styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 style={{ color: "#0E3F09" }}>Eventies</h1>
      </Link>
      <div className="mid-navbar">
        <ul>
        <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
        <li>
            <NavLink to="/events" activeClassName="active">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/features" activeClassName="active">
              Features
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="last-navbar">
        <Link to="/signup">
          <Button title={"Sign Up"} backColor={"#C1F0C3"} color={"#0E3F09"} />
        </Link>
        <Link to="/login">
          <Button title={"Login"} backColor={"#D3D8EA"} color={"#0E3F09"} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
