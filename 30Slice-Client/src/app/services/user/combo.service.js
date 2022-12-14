import api from "../../axios/api";

export const getCombo = async () => {
  try {
    const response = await api.get("combo/getCombos");
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
};
export const getComboById = async (id) => {
  try {
    const response = await api.get(`combo/getOneCombo/${id}`);
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
};
