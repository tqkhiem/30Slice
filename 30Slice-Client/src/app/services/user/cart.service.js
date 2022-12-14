import api from "../../axios/api";
export const CheckoutCod = async (data) => {
  try {
    const res = await api.post("order", data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
export const GetOrdersByCustomer = async (data) => {
  try {
    const res = await api.get("order/getOneOrder/" + data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
export const CheckoutVnpay = async (data) => {
  try {
    const res = await api.post("order/orderVnpay", data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
export const CheckoutMomo = async (data) => {
  try {
    const res = await api.post("order/momoPay", data);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    throw new Error(err);
  }
};
