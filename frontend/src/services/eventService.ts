import axios from "axios";
const url = "http://localhost:3001/api/events";

const getAllEvents = () => {
  return axios.get(url);
};

const getSingleEvent = (eventId) => {
  return axios.get(url + `/${eventId}`)
}

export { getAllEvents, getSingleEvent };