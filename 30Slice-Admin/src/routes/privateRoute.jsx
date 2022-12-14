import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoginState, selectUser } from '../app/redux/slices/auth/auth';
import { ROLE } from '../app/services/role/role';

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectLoginState);
  const user = useSelector(selectUser);
  return isLoggedIn && ROLE.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
