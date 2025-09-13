import * as actiontypes  from "./ActionType";
import { api, API_URL } from "../../config/api"



export const createMenuItem = ({menu,jwt}) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.CREATE_MENU_ITEM_REQUEST});
        try{
            const {data} =await api.post("api/admin/food",menu,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:actiontypes.CREATE_MENU_ITEM_SUCCESS,payload:data});
            console.log("created meun",data);
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.CREATE_MENU_ITEM_FAILURE,payload:error});
        }
    };
};

export const getMenuItemByRestaurantId = (reqData) =>{
    return async(dispatch) =>{
        dispatch({type:actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST});
        try
        {
           
            const {data} = await api.get(`api/food/restaurant/${reqData.restaurantId}`, {
    headers: {
        Authorization: `Bearer ${reqData.jwt}`,
    },
});
            dispatch({type:actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,payload:data});
            console.log("menu items by restaurant-----------------------------------------||||||||||||||||||||||==========",data)
        }
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,payload:error});
        }
    };
};

export const searchMenuItem = ({keyword,jwt}) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.SEARCH_MENU_ITEM_REQUEST});
        try{
            const {data} =await api.get(`api/food/search?name=${keyword}`,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:actiontypes.SEARCH_MENU_ITEM_SUCCESS,payload:data});
            console.log("data",data);
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.SEARCH_MENU_ITEM_FAILURE,payload:error});
        }
    };
};
    
export const updateMenuItemAvailibilty = ({foodId,jwt}) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try{
            const {data} =await api.put(`api/admin/food/${foodId}`,{},
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data});
            console.log("update menu item avablt",data);
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error});
        }
    };
};

export const deleteFoodAction = ({foodId,jwt}) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.DELETE_MENU_ITEM_REQUEST});
        try{
            const {data} =await api.delete(`api/admin/food/${foodId}`,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:actiontypes.DELETE_MENU_ITEM_SUCCESS,payload:foodId});
            console.log("DELETED FOOD",data);
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.DELETE_MENU_ITEM_FAILURE,payload:error});
        }
    };
};
