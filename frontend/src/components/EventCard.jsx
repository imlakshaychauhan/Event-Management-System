import "./styles/eventcard.css";
import profile from "../assets/profile.png";
import {formatDate} from "../utils/helpers";

const EventCard = ({ title, backImg, date, startTime, endTime }) => {
  return (
    <div className="event" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backImg})`}}>
      <div className="left">
        <p className="title">{title.length > 15 ? title.slice(0, 15) + '...' : title}</p>
        <p className="timing">{formatDate(date)} | {startTime} to {endTime}</p>
      </div>
      <div className="right">
        <img src={profile} alt="Profile" />
        <p className="participants">500+</p>
      </div>
    </div>
  );
};

export default EventCard;