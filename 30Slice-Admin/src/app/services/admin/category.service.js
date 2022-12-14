import api from "../../axios/api";

export const getCategory = async () => {
  try {
    const response = await api.get("category/getAllCategories");
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const getOneCategory = async (id) => {
  try {
    const response = await api.get("category/getOneCategory/" + id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};
export const getParentCategory = async () => {
  try {
    const response = await api.get("category/getCategoriesParent");
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};
export const UpdateCategory = async (data) => {
  try {
    const response = await api.put("category", data);
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
};
export const DeleteCategory = async (id) => {
  try {
    const response = await api.delete("category?id=" + id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};
export const AddCategory = async (data) => {
  try {
    const response = await api.post("category", data);
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (err) {
    throw new Error(err);
  }
};
