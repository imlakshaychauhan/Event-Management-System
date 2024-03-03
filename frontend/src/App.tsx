import { useEffect } from "react";
import {getAllUsers} from "./services/userService";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

function App() {

  // useEffect(() => {
  //   getAllUsers()
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err))
  // }, []);

  return (
    <>
      <Navbar />
      <Homepage />
    </>
  )
}

export default App
