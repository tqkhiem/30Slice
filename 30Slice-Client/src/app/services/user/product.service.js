import api from "../../axios/api";
export const getProductsHome = async () => {
  try {
    const response = await api.get("/product/getProductsHome");
    return response.data;
  } catch (error) {
    throw new Error(err);
  }
};
export const getProductsByCategory = async (id, page, limit) => {
    try {
        const response = await api.get(
        `/product/getProductsByCategory?id=${id}&page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        throw new Error(err);
    }
    }