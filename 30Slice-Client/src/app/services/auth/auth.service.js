import api from '../../axios/api';
import TokenService from './token.service';

const login = async (username, password) => {
  const response = await api.post('/auth/signin', {
    username,
    password,
  });
  if (response.data.accessToken) {
    TokenService.setUser(response.data);
  }
  return response.data;
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
