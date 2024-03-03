import "./styles/eventcard.css";
import profile from "../assets/profile.png";

const EventCard = ({backCol}) => {
  return (
    <div className="event" style={{ backgroundColor: backCol }} >
      <div className="left">
        <p className="title">Concert - Justin Bieber</p>
        <p className="timing">10/01/2024 - 16:00 to 18:00</p>
      </div>
      <div className="right">
        <img src={profile} />
        <p className="participants">500+</p>
      </div>
    </div>
  );
};

export default EventCard;