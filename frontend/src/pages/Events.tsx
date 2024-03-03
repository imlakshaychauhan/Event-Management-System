import EventCard from "../components/EventCard";
import LoadingCard from "../components/LoadingCard";
import "./styles/events.css";

const Events = () => {

  const liveCol = "#55BF59"
  const upcomingCol = "#6A7ACF"
  const pastCol = "#040404"

  return (
    <div className="events">
      <div className="input-container">
        <input placeholder="Search Title..." name={"searchevent"} />
      </div>
      <p className="header">Live Events</p>
      <div className="eventlist">
        <EventCard backCol={liveCol} />
        <EventCard backCol={liveCol} />
        <EventCard backCol={liveCol} />
        <EventCard backCol={liveCol} />
        <LoadingCard color={liveCol} />
      </div>
      <p className="header">Upcoming Events</p>
      <div className="eventlist">
        <EventCard backCol={upcomingCol} />
        <EventCard backCol={upcomingCol} />
        <EventCard backCol={upcomingCol} />
        <EventCard backCol={upcomingCol} />
        <EventCard backCol={upcomingCol} />
        <LoadingCard color={upcomingCol} />
      </div>
      <p className="header">Old Events</p>
      <div className="eventlist">
        <EventCard backCol={pastCol} />
        <EventCard backCol={pastCol} />
        <EventCard backCol={pastCol} />
        <LoadingCard color={pastCol} />
      </div>
    </div>
  );
};

export default Events;
