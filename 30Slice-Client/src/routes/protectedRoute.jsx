import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/redux/slices/auth/auth';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectUser);
  return !isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
