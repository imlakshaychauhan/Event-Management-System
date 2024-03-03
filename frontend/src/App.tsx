import Homepage from "./pages/Homepage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Body";
import Signup from "./pages/Signup";
import "./App.css"
import Login from "./pages/Login";
import Events from "./pages/Events";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/events",
        element: <Events />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
