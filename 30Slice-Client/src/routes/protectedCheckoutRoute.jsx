import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/redux/slices/auth/auth';

function ProtectedCheckoutRoute({ children }) {
  const isLoggedIn = useSelector(selectUser);
  return !isLoggedIn ? children : <Navigate to="/checkout2" />;
}

export default ProtectedCheckoutRoute;
