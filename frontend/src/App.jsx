import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";
import Body from "./Body";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Event from "./pages/Event";
import { Provider } from "react-redux";
import store from "./utils/store";
import { useSelector } from "react-redux";
import RegisterEvent from "./pages/RegisterEvent";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import UpdateEvent from "./pages/UpdateEvent";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Body />}>
      <Route path="*" element={<Homepage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupOrNavigateToHomepage />} />
      <Route path="/login" element={<LoginOrNavigateToHomepage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/register-event/:id" element={<RegisterEventOrNavigateToLogin />} />
      <Route path="/create-event" element={<CreateEventOrNavigateToLogin />} />
      <Route path="/profile" element={<ProfileOrNavigateToLogin />} />
      <Route path="/update-event/:id" element={<UpdateEventOrNavigateToLogin />} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

// Functional components to conditionally render routes based on login status
function SignupOrNavigateToHomepage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : <Signup />;
}

function LoginOrNavigateToHomepage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : <Login />;
}

function RegisterEventOrNavigateToLogin() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <RegisterEvent /> : <Navigate to="/login" replace />;
}

function CreateEventOrNavigateToLogin() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <CreateEvent /> : <Navigate to="/login" replace />;
}

function ProfileOrNavigateToLogin() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <Profile /> : <Navigate to="/login" replace />;
}

function UpdateEventOrNavigateToLogin() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <UpdateEvent /> : <Navigate to="/login" replace />;
}

export default App;
