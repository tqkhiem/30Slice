import api from "../../axios/api";

const getStylelistBoard = () => {
  return api.get("user/test/stylelist");
};

const getAdminBoard = () => {
  return api.get("/user/test/admin");
};

const UserService = {
  getStylelistBoard,
  getAdminBoard,
};
export default UserService;
