import api from "../../axios/api";

export const getNews = async () => {
  try {
    const response = await api.get("news/getAllNews");
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const getOneNews = async (id) => {
  try {
    const response = await api.get("news/getOneNews/" + id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const addNews = async (data) => {
  try {
    const res = await api.post("news/", data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateNews = async (data) => {
  try {
    const res = await api.put("news/", data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteNews = async (data) => {
  try {
    const res = await api.delete("news/", { data });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
