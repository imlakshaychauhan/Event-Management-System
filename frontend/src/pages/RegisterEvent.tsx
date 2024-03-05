import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { formatDateRange } from "../utils/helpers";
import { getSingleEvent } from "../services/eventService"; // Add this import
import "./styles/registerevent.css";
const RegisterEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

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

  return (
    <div className="registerEvent">
      <Link to={`/event/${id}`}>
        <Button
          title={"Back to Event"}
          backColor={"#000000"}
          color={"#FFFFFF"}
          borderRadius={"10px"}
        />
      </Link>
      {event && (
        <div className="card-container">
          <div className="card">
            <div className="left-side">
              <h1>You're going!</h1>
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="right-side">
              <h1>{event.title}</h1>
              <span>{formatDateRange(event.startDate, event.endDate)}</span>
              <span>
                {event.startTime} - {event.endTime}
              </span>
              <Button
                title={"Add to Calendar"}
                backColor={"#249329"}
                color={"#FFFFFF"}
              />
              <span className="rsvp-link">Edit RSVP</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterEvent;
