// import axios from 'axios';
// import authHeader from './auth-header';
// import api from './auth/api';
import api from '../../axios/api';


  export const ChangePassword = async (data) => {
    try {
      const response = await api.put('user/change-password', data);
      if (response.status === 200 || response.status === 201) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
export const ChangeInfo = async (data) => {
    try {
      const response = await api.put('user/change-info', data);
      if (response.status === 200 || response.status === 201) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
// const API_URL = import.meta.env.REACT_APP_API_ENDPOINT;

// const getAdminBoard = () => {
//   return axios.get(API_URL + 'admin/info', { headers: authHeader() });
// };

// const ChangePassword = async (old_password, new_password) => {
//   const response = await axios.post(API_URL + 'admin/change-password', {
//     old_password,
//     new_password,
//   },{
//     headers: authHeader()
//   });

//   if (response.data) {
//     console.log(response.data);

//   }
//   return response.data;
// };
// const EditCategory = async (old_category, new_category) => {
//   const response = await axios.post(API_URL + 'admin/edit-category', {
//     old_category,
//     new_category,
//   },{
//     headers: authHeader()
//   });

//   if (response.data) {
//     console.log(response.data);
//   }
//   return response.data;
// };


// const adminService = {
//   getAdminBoard,
//   ChangePassword
// };

// export default adminService;
