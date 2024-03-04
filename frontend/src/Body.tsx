import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Body = () => {
  // const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // useEffect(() => {
  //   if(!isLoggedIn) {
  //     navigate("/", {replace: true});
  //   }
  // }, [isLoggedIn])

  return (
    <>
    <Navbar />
      <Outlet />
      </>
  );
};

export default Body;
