import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./styles/navbar.css";
import useAuth from "../utils/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedInFalse } from "../utils/userSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { logout } = useAuth();
  const handleLogout = () => {
    dispatch(setIsLoggedInFalse());
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 style={{ color: "#0E3F09" }}>Eventies</h1>
      </Link>
      <div className="mid-navbar">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" exact>
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
          {isLoggedIn && (
            <li>
              <NavLink to="/calendar" activeClassName="active">
                Calendar
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="last-navbar">
        {isLoggedIn ? (
          <>
            <Link to="/profile">
            <Button title={"Profile"} backColor={"#C1F0C3"} color={"#0E3F09"} />
            </Link>
            <Button
              title={"Logout"}
              backColor={"black"}
              color={"white"}
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button
                title={"Sign Up"}
                backColor={"#C1F0C3"}
                color={"#0E3F09"}
              />
            </Link>
            <Link to="/login">
              <Button title={"Login"} backColor={"#D3D8EA"} color={"#0E3F09"} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
