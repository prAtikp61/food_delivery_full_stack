import * as actiontypes  from "./ActionType";
import { api, API_URL } from "../../config/api"

export const updateOrderStatus = ({orderId,orderStatus,jwt}) => {
    return async (dispatch) => {
     
        try{
               dispatch({type: actiontypes.UPDATE_ORDER_STATUS_REQUEST});
            const response =await api.put(`api/admin/order/${orderId}/${orderStatus}`,{},    
                {
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
      const updatedOrder =response.data;
            console.log("created order data",updatedOrder);
                   dispatch({type:actiontypes.UPDATE_ORDER_STATUS_SUCCESS,payload:updatedOrder});
        }
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.UPDATE_ORDER_STATUS_FAILURE,error}); 
        }
    };
};

export const fetchRestaurantsOrder = ({restaurantId,orderStatus,jwt}) => {
    return async (dispatch) => {
        dispatch({type: actiontypes.GET_RESTAURANTS_ORDER_REQUEST});
        try{
            const {data} =await api.get(`api/admin/order/restaurant/${restaurantId}`,    
                {
                    params:{order_status:orderStatus},
                headers :{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const orders=data;
            console.log("restaurant order",orders);
            dispatch({type:actiontypes.GET_RESTAURANTS_ORDER_SUCCESS,payload:orders});
        }
    
        catch(error){
            console.log("catch error",error)
            dispatch({type:actiontypes.GET_RESTAURANTS_ORDER_FAILURE,error}); 
        }
    };
};