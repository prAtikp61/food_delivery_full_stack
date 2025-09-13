import * as actiontypes  from "./ActionType";
import { api, API_URL } from "../../config/api"

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.CREATE_ORDER_REQUEST });
    try {
      // Send the full OrderReq object in the body
      const { data } = await api.post(
        `api/order`,
        reqData, // <-- send reqData directly
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      console.log(
        "created order data:",
        data
      );
      dispatch({ type: actiontypes.CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error2:", error);
      dispatch({ type: actiontypes.CREATE_ORDER_FAILURE, payload: error });
    }
  };
};

export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.GET_USERS_ORDERS_REQUEST});
        try{
            const {data} =await api.get(`api/order/user`,    
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            // if(data.payment_url){
            //     window.location.href=data.payment_url;
            // }
            console.log("users order",data);
            dispatch({type:actiontypes.GET_USERS_ORDERS_SUCCESS,payload:data});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.GET_USERS_ORDERS_FAILURE,payload:error}); 
        }
    };
};