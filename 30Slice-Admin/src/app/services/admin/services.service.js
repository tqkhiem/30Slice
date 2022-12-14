import api from '../../axios/api';

export const getServices = async () => {
  try {
    const response = await api.get('service/getAllServices');
    if (response.status === 200) {
      return response.data;
    }

  } catch (err) {
    throw new Error(err)
  }

};

export const addService = async (data) => {
  try {
    const res = await api.post("service/addService", data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateService = async (data) => {
  try {
    const res = await api.put("service/updateService", data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteService = async (data) => {
  try {
    const res = await api.delete("service/deleteService", { data });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

