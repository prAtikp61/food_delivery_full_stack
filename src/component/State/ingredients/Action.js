import * as actiontypes  from "./Actiontype";
import { api, API_URL } from "../../config/api"

export const getIngredientsOfRestaurant = ({id,jwt}) => {
    return async (dispatch) => {
        try{
            const response =await api.get(`api/admin/ingredients/restaurant/${id}`,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get all ingredients",response.data)
            dispatch({type:actiontypes.GET_INGREDIENTS,payload:response.data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.FIND_CART_FAILURE,payload:error}); 
        }
    };
};

export const createIngredients = ({data,jwt}) => {
    return async (dispatch) => {
        try{
            const response =await api.post(`api/admin/ingredients`,data,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get all ingredients",response.data)
            dispatch({type:actiontypes.CREATE_INGREDIENT_SUCCESS,payload:response.data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.FIND_CART_FAILURE,payload:error}); 
        }
    };
};

export const createIngredientsCategory = ({data,jwt}) => {
    console.log("data",data,"jwt",jwt);
    return async (dispatch) => {
        try{
            const response =await api.post(`api/admin/ingredients/category`,data,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create ingredients",response.data)
            dispatch({type:actiontypes.CREATE_INGREDIENT_CATEGORY_SUCCESS,payload:response.data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.FIND_CART_FAILURE,payload:error}); 
        }
    };
};

export const getIngredientsCategory = ({id ,jwt}) => {
    
    return async (dispatch) => {
        try{
            const response =await api.get(`api/admin/ingredients/restaurant/${id}/category`,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get ingredients category",response.data)
            dispatch({type:actiontypes.GET_INGREDIENTS_CATEGORY_SUCCESS ,payload:response.data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.FIND_CART_FAILURE,payload:error}); 
        }
    };
};

export const updateStock = ({id,jwt}) => {
    return async (dispatch) => {
        try{
            const {data} =await api.put(`api/admin/ingredients/${id}/stock`,{},
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create ingredients",data)
            dispatch({type:actiontypes.UPDATE_STOCK,payload:data});
        }
    
        catch(error){
            console.log("catch error",error)
        
        }
    };
};


