import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoginState } from '../app/redux/slices/auth/auth';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectLoginState);
  return !isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
