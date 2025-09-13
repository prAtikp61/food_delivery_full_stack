import * as actiontypes  from "./ActionType";
import { api, API_URL } from "../../config/api"



export const findcart = (token) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.FIND_CART_REQUEST});
        try{
            const response =await api.get(`api/cart`,
                {
                headers :{
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("this is cart brother-------------////////////////////////////////////////",response.data)
            dispatch({type:actiontypes.FIND_CART_SUCCESS,payload:response.data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.FIND_CART_FAILURE,payload:error}); 
        }
    };
};

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.GET_ALL_CART_ITEMS_REQUEST}); 
        try{
            const response =await api.get(`api/cart/${reqData.cartId}/items`,
                {
                headers :{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({type:actiontypes.GET_ALL_CART_ITEMS_SUCCESS,payload:response.data});
        }
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.GET_ALL_CART_ITEMS_FAILURE,payload:error}); 
        }
    };
};

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.ADD_ITEM_TO_CART_REQUEST});
        try{
            const {data} =await api.put(`api/cart/add`,reqData.cartItem,
                {
                headers :{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            console.log("addedddddddddddddddddddddddddddd item to cart",data)
            dispatch({type:actiontypes.ADD_ITEM_TO_CART_SUCCESS,payload:data});
             return data;
        }
    
        catch(error){
            console.log("catch error cart walaaaaaaaaaa errror is hereeee",error)
            dispatch({type:actiontypes.ADD_ITEM_TO_CART_FAILURE,payload:error}); 
        }
    };
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: actiontypes.UPDATE_CARTITEM_REQUEST });
  try {
    const { data } = await api.put(
      `api/cart-item/update`,
      {
        cartItemId: reqData.cartItemId,
        quantity: reqData.quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );

    dispatch({ type: actiontypes.UPDATE_CARTITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actiontypes.UPDATE_CARTITEM_FAILURE, payload: error });
  }
};


export const removeCartItem = ({cartItemId,jwt}) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.REMOVE_CARTITEM_REQUEST});
        try{
            const {data} =await api.delete(`api/cart-item/${cartItemId}/remove`,
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("remove cartItem",data)
            dispatch({type:actiontypes.REMOVE_CARTITEM_SUCCESS,payload:cartItemId});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.REMOVE_CARTITEM_FAILURE,payload:error.message}); 
        }
    };
};

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({type: actiontypes.CLEAR_CART_REQUEST});
        try{
            const {data} =await api.put(`api/cart/clear`,{},
                {
                headers :{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("clear cart",data)
            dispatch({type:actiontypes.CLEAR_CART_SUCCESS,payload:data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.CLEAR_CART_FAILURE,payload:error.message}); 
        }
    };
};

