import Button from "../components/Button";
import "./styles/homepage.css"
import {Link} from "react-router-dom";

const Homepage = () => {
  return (
    <>
    <div className="main-content">
      <p className="first-p" >WE ARE EVENTIES</p>
      <p className="second-p">Join the Celebration: Your Events, Our Expertise.</p>
      <p className="third-p">Let Us Coordinate for You. We take the stress out of event planning, offering personalized assistance to ensure your gatherings are flawless and unforgettable.</p>
      <Link to="/create-event">
      <Button title={"Let's Create Event"} backColor={"#249329"} color={"#FFFFFF"} />
      </Link>
    </div>
    </>
  )
}


export default Homepage;