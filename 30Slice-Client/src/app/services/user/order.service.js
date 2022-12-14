import api from "../../axios/api";

export const GetOrderHistory = async () => {
  try {
    const response = await api.get("order/getOrdersByCustomer");
    if (response.status === 200 || response.status === 201) {
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
};