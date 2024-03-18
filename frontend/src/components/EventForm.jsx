import { useState } from "react";
import Button from "./Button";
import { createEvent } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: {
      address: "",
      city: "",
      country: "",
    },
    imgTheme: "",
    eventImages: [],
  });

  const successfulEventCreation = () => toast.success(`Event Created Successfully!✅`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await createEvent(formData, token);
    successfulEventCreation();
    navigate("/events");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        placeholder="Enter Title.."
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Enter Description.."
        onChange={handleChange}
        required
      />
      <input
        name="startDate"
        value={formData.startDate}
        type="date"
        onChange={handleChange}
        required
      />
      <input
        name="endDate"
        value={formData.endDate}
        type="date"
        onChange={handleChange}
        required
      />
      <input
        type="time"
        value={formData.startTime}
        name="startTime"
        onChange={handleChange}
        required
      />
      <input
        type="time"
        value={formData.endTime}
        name="endTime"
        onChange={handleChange}
        required
      />
      <input
        name="location.address"
        value={formData.location.address}
        type="text"
        placeholder="Enter Address.."
        onChange={handleChange}
        required
      />
      <input
        name="location.city"
        value={formData.location.city}
        type="text"
        placeholder="Enter City.."
        onChange={handleChange}
        required
      />
      <input
        name="location.country"
        value={formData.location.country}
        type="text"
        placeholder="Enter Country.."
        onChange={handleChange}
        required
      />
      <input
        name="imgTheme"
        value={formData.imgTheme}
        type="text"
        placeholder="Enter Image Theme Link.."
        onChange={handleChange}
        required
      />
      <input
        name="imgTheme"
        value={formData.imgTheme}
        type="text"
        placeholder="Enter Image Link.."
        onChange={handleChange}
      />
      <Button
        type={"submit"}
        title={"Create Event"}
        backColor={"#249329"}
        color={"#FFFFFF"}
      />
    </form>
  );
};

export default EventForm;
