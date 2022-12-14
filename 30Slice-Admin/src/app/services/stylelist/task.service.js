import api from '../../axios/api';

export const getTask = async (date) => {
    try {
      const response = await api.get("booking/getBookingByStyleList?date="+date);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
export const completeTask = async (data) => {
    try {
      const response = await api.put("booking/updateBooking", data);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
export const changeService = async (data) => {
    try {
      const response = await api.put("booking/updateServiceBooking", data);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  }