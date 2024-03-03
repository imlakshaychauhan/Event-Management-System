import Button from './Button';
import "./styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Eventies</h1>
      <div className="mid-navbar">
        <ul>
          <li>Events</li>
          <li>About</li>
          <li>Features</li>
        </ul>
      </div>
      <div className="last-navbar">
        <Button title={"Sign Up"} backColor={"#C1F0C3"} color={"#0E3F09"} />
        <Button title={"Login"} backColor={"#D3D8EA"} color={"#0E3F09"} />
      </div>
    </div>
  );
};

export default Navbar;