import api from '../../axios/api';

export const getCommentByProduct = async (id) =>{
    try{
        const response = await api.get('comment/getCommentByProduct/' + id);
        if(response.status === 200){
            return response.data;
        }
    }catch(err){
        throw new Error(err);
    }
} 

export const addComment = async (data) =>{
    try{
        const response = await api.post('comment/',data);
        return response;
    }catch(err){
        throw new Error(err);
    }
}

export const updateComment = async (data) => {
    try{
        const response = await api.put('comment/',data);
        return response;
    }catch(err){
        throw new Error(err);
    }
}

export const deleteCommentByAdmin = async (data) =>{
    try{
        const response = await api.delete('comment/',{data});
        return response;
    }catch(err){
        throw new Error(err);
    }
}