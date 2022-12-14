import api from '../../axios/api';

export const getCombos = async () => {
    try{
        const response = await api.get('combo/getAllCombos');
        if(response.status === 200){
            return response.data;
        }
        
    }catch(err){
        throw new Error(err)
    }
    
};

export const getOneCombo = async (id) => {
    try{
        const response = await api.get('combo/getOneCombos' + id);
        if(response.status === 200) {
            return response.data;
        }
        
    }catch(err){
        throw new Error(err)
    }
    
}

export const addCombo = async (data) => {
     try{
       const response = await api.post('combo/', data)
       return response
     }catch(err){
        throw new Error(err)
     }
}

export const updateCombo = async (data) => {
    try{
       const res = await api.put('combo/', data)
       return res;
    }catch(err){
        throw new Error(err)
    }
}

export const deleteCombo = async (data) => {
    try{
       const res = await api.delete('combo/',{data})
       return res
    }catch(err){
        throw new Error(err)
    }
}

