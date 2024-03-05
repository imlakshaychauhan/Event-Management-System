import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import LoadingCard from "../components/LoadingCard";
import "./styles/events.css";
import { getAllEvents } from "../services/eventService";
import { Link } from "react-router-dom";

const Events = () => {
  const liveCol = "#55BF59";
  const upcomingCol = "#6A7ACF";
  const pastCol = "#040404";

  const [events, setEvents] = useState([]);

  const [pastEvents, setPastEvents] = useState();
  const [liveEvents, setLiveEvents] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllEvents();
      const data = await res.data;
      setEvents(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const now = new Date();
    const past = [];
    const live = [];
    const upcoming = [];

    events.forEach((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      if (endDate < now) past.push(event);
      else if (startDate <= now && endDate >= now) live.push(event);
      else upcoming.push(event);
    });

    setPastEvents(past);
    setLiveEvents(live);
    setUpcomingEvents(upcoming);
  }, [events]);

  return (
    <div className="events">
      <div className="input-container">
        <input placeholder="Search Title..." name={"searchevent"} />
      </div>
      <p className="header">Live Events</p>
      <div className="eventlist">
        {liveEvents && liveEvents.length > 0
          ? liveEvents.map((event) => {
              return (
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <EventCard title={event.title} backImg={event.imgTheme} />
                </Link>
              );
            })
          : null}
        <LoadingCard color={liveCol} />
      </div>
      <div className="lines"></div>
      <p className="header">Upcoming Events</p>
      <div className="eventlist">
        {upcomingEvents && upcomingEvents.length > 0
          ? upcomingEvents.map((event) => {
              return (
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <EventCard title={event.title} backImg={event.imgTheme} />{" "}
                </Link>
              );
            })
          : null}
        <LoadingCard color={upcomingCol} />
      </div>

      <div className="lines"></div>
      <p className="header">Old Events</p>
      <div className="eventlist">
        {pastEvents && pastEvents.length > 0
          ? pastEvents.map((event) => {
              return (
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <EventCard title={event.title} backImg={event.imgTheme} />{" "}
                </Link>
              );
            })
          : null}
        <LoadingCard color={pastCol} />
      </div>
    </div>
  );
};

export default Events;
