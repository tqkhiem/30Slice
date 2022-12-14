import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/redux/slices/auth/auth';

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectUser);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
