import api from '../../axios/api';
const date = new Date();

export const getTotalOrdersByMonth = async (year = date.getFullYear()) => {
  try {
    const response = await api.get('admin/statistic/getTotalOrdersByMonth');
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};
