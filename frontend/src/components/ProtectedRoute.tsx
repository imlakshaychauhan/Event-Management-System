import { Route, Navigate } from 'react-router-dom';
import useAuth from '../services/useAuth';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;