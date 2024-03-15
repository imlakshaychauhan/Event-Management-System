import axios from "axios";
const url = "https://event-management-system-ptoj.onrender.com/api/events";

const getAllEvents = () => {
  return axios.get(url);
};

const getSingleEvent = (eventId) => {
  return axios.get(url + `/${eventId}`);
};

const registerEvent = (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(url + "/register-event", { eventId }, config);
};

const deregisterEvent = (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(url + "/deregister-event", { eventId }, config);
};

const createEvent = (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(url + "/create-event", formData, config);
};

const updateEvent = (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.put(url + `/${formData.id}`, formData, config);
};

const deleteEvent = (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.delete(url + `/${eventId}`, config);
};

export {
  getAllEvents,
  getSingleEvent,
  registerEvent,
  deregisterEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
