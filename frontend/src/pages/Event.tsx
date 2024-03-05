import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import clock from "../assets/clock.png";
import location from "../assets/location.png";
import { useEffect, useState } from "react";
import { getSingleEvent } from "../services/eventService";
import { formatDateRange } from "../utils/helpers";
import "./styles/event.css";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleEvent(id);
        const data = res.data; // Removed unnecessary await
        console.log(data);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Conditional rendering
  if (event) {
    return (
      <div>
        <Link to="/events">
          <Button
            title={"Back to Events"}
            backColor={"#000000"}
            color={"#FFFFFF"}
            borderRadius={"8px"}
          />
        </Link>
        <div className="main-container">
          <div className="left-div">
            <h1>{event.title}</h1>
            <p className="desc">{event.description}</p>
            <div className="event-theme-img">
              {event?.imgTheme && (
                <img src={event.imgTheme} alt="Event Theme" />
              )}
            </div>
          </div>
          <div className="right-div">
            <Button title={"Attend"} backColor={"#55BF59"} color={"#FBF0F0"} />
            <div className="inner-right">
              <div className="date">
                <img src={clock} alt="Clock Icon" />
                <div className="location-div">
                  <span>{formatDateRange(event.startDate, event.endDate)}</span>
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
              </div>
              <div className="time">
                <img src={location} alt="Location Icon" />
                <div className="location-div">
                  <span>
                    {event.location.address && event.location.address},
                  </span>
                  <span>{event.location.city && event.location.city},</span>
                  <span>
                    {event.location.country && event.location.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="map"></div>
          </div>
        </div>

        <div className="lines"></div>
        <div className="event-photos-container">
          {event.eventImages && event.eventImages.length > 0 && (
            <h1>Event Photos</h1>
          )}
          {event.eventImages && event.eventImages.length > 0
            ? event.eventImages.map((image, index) => (
                <div key={index} className="gallery">
                  {image.url && (
                    <img src={image.url} alt={`Photo ${index + 1}`} />
                  )}
                  <p>{image.name}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  } else {
    return null; // Render nothing while data is being fetched
  }
};

export default Event;
