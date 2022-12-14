import api from '../../axios/api';

export const getProducts = async () => {
    try{
        const response = await api.get('product/getAllProducts');
        if(response.status === 200){
            return response.data;
        }
        
    }catch(err){
        throw new Error(err)
    }
    
};

export const getOneProduct = async (id) => {
    try {
      const response = await api.get("product/getOneProduct/" + id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  
  export const addProduct = async (data) => {
    try {
      const res = await api.post("product/", data);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };
  
  export const updateProduct = async (data) => {
    try {
      const res = await api.put("product/", data);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };
  
  export const deleteProduct = async (data) => {
    try {
      const res = await api.delete("product/", { data });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

