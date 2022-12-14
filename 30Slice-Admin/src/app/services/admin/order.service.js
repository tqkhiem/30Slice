import api from '../../axios/api';

export const getAllOrders = async () => {
    try{
        const response = await api.get('order/getAllOrders');
        if(response.status === 200){
            return response.data;
        }
        
    }catch(err){
        throw new Error(err)
    }
    
};

export const getOneOrder = async (id) => {
    try {
      const response = await api.get("order/getOneOrder/" + id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  
  
  export const noteByAdmin = async (data) => {
    try {
      const res = await api.put("order/noteByAdmin", data);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };
  
  export const deleteOrder = async (data) => {
    try {
      const res = await api.put("order/DeleteOrderByAdmin",  data );
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

