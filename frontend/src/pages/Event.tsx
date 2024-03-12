import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import clock from "../assets/clock.png";
import location from "../assets/location.png";
import { useEffect, useState } from "react";
import { getSingleEvent } from "../services/eventService";
import { decodeToken, formatDateRange } from "../utils/helpers";
import "./styles/event.css";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleEvent(id);
        const data = res.data;
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (event) setCurrentStatus(!currentStatus);
  }, [event]);

  // Conditional rendering
  if (event) {
    return (
      <div>
        <div className="event-btn">
          <Link to="/events">
            <Button
              title={"Back to Events"}
              backColor={"#000000"}
              color={"#FFFFFF"}
              borderRadius={"8px"}
            />
          </Link>
        </div>
        <div className="m-container">
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
            {currentStatus ? (
              <div className="attendance-div">
                <p>You're Going!</p>
                <Link to={`/register-event/${event.id}`}>
                  <Button
                    title={"Edit Attendance"}
                    backColor={"#FF0000"}
                    color={"#FFFFFF"}
                  />
                </Link>
              </div>
            ) : (
              <Link to={`/register-event/${event.id}`}>
                <Button
                  title={"Attend"}
                  backColor={"#55BF59"}
                  color={"#FBF0F0"}
                />
              </Link>
            )}

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
