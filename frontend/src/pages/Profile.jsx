import { useEffect, useState } from "react";
import userProfile from "../assets/profile.svg";
import { decodeToken } from "../utils/helpers";
import "./styles/profile.css";
import { getUserInfo } from "../services/userService";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
  });

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [myCreatedEvents, setMyCreatedEvents] = useState([]);
  const [currentTab, setCurrentTab] = useState("registered");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getUserInfo(decodedToken.username);
        const data = res.data;
        setUserData({
          name: data.name,
          username: data.username,
        });
        setRegisteredEvents(data.eventsRegisteredTo);
        setMyCreatedEvents(data.myCreatedEvents);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchInfo();
  }, [decodedToken.username]);

  return (
    <div className="profile-div">
      <div className="profile-left-div">
        <img src={userProfile} alt="User Profile" />
        <div className="profile-center">
          <p className="name">{userData.name}</p>
          <p className="username">@{userData.username}</p>
        </div>
        <p className="email-phone">
          Email: <span> -------------@gmail.com</span>
        </p>
        <p className="email-phone">
          Phone: <span> +91 8979--------</span>
        </p>
      </div>
      <div className="profile-right-div">
        <div className="tabs">
          <p
            className="registered-events-p"
            style={
              currentTab === "registered"
                ? { color: "#249329", textDecoration: "underline" }
                : { marginRight: "30px" }
            }
            onClick={() => setCurrentTab("registered")}
          >
            Registered Events
          </p>
          <p
            className="registered-events-p"
            style={
              currentTab === "created"
                ? { color: "#249329", textDecoration: "underline" }
                : { marginLeft: "30px" }
            }
            onClick={() => setCurrentTab("created")}
          >
            My Created Events
          </p>
        </div>
        <div className="profile-events">
          {currentTab === "registered" &&
          registeredEvents &&
          registeredEvents.length > 0 ? (
            registeredEvents.map((event) => (
              <div className="profile-event-card" key={event.id}>
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <EventCard title={event.title} backImg={event.imgTheme} date={event.startDate} startTime={event.startTime} endTime={event.endTime} />
                </Link>
              </div>
            ))
          ) : currentTab === "created" &&
            myCreatedEvents &&
            myCreatedEvents.length > 0 ? (
            myCreatedEvents.map((event) => (
              <div className="profile-event-card" key={event.id}>
                <Link
                  to={`/event/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <EventCard title={event.title} backImg={event.imgTheme} date={event.startDate} startTime={event.startTime} endTime={event.endTime} />
                </Link>
              </div>
            ))
          ) : (
            <p>No events to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
