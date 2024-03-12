import axios from "axios";
const url = "http://localhost:3001/api/events";

const getAllEvents = () => {
  return axios.get(url);
};

const getSingleEvent = (eventId) => {
  return axios.get(url + `/${eventId}`)
}

const registerEvent = (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.post(url + "/register-event", {eventId}, config)
}

const deregisterEvent = (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.post(url + "/deregister-event", {eventId}, config)
}

export { getAllEvents, getSingleEvent, registerEvent, deregisterEvent };