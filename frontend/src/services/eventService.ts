import axios from "axios";
const url = "https://event-management-system-ptoj.onrender.com/api/events";

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

const createEvent = (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.post(url + "/create-event", formData, config);
}

export { getAllEvents, getSingleEvent, registerEvent, deregisterEvent, createEvent };