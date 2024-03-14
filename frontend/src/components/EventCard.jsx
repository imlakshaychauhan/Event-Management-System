import "./styles/eventcard.css";
import profile from "../assets/profile.png";

const EventCard = ({ title, backImg }) => {
  return (
    <div className="event" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backImg})`}}>
      <div className="left">
        <p className="title">{title.length > 15 ? title.slice(0, 15) + '...' : title}</p>
        <p className="timing">10/01/2024 - 16:00 to 18:00</p>
      </div>
      <div className="right">
        <img src={profile} alt="Profile" />
        <p className="participants">500+</p>
      </div>
    </div>
  );
};

export default EventCard;