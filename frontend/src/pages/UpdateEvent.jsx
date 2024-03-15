import React from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";

const UpdateEvent = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="create-event">
      <Button
        title={"Back to Events"}
        backColor={"#000000"}
        color={"#FFFFFF"}
        borderRadius={"10px"}
        onClick={handleGoBack}
      />
      <div className="form-container">
        <div className="left-container">
          <h1>Let's update the event details below!</h1>
          <UpdateForm eventId={id} />
        </div>
        <div className="right-container">
          <img src="https://images.unsplash.com/photo-1641809445226-28c92be05d9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D" />
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
