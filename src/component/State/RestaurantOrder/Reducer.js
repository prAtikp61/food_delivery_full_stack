import * as actiontypes  from "./ActionType";
import { api, API_URL } from "../../config/api"
import { act } from "react";


const initialState = {
    orders:[],
    isLoading:false,
    error:null,
 
};

export const restaurantsorderReducer=(state=initialState,action)=>{

    switch(action.type){
        case actiontypes.GET_RESTAURANTS_ORDER_REQUEST:
                    case actiontypes.UPDATE_ORDER_STATUS_REQUEST:
            return{
                ...state,
                error:null,
                isLoading:true,
            };


               case actiontypes.GET_RESTAURANTS_ORDER_SUCCESS:
                 return{
                ...state,
                error:null,
                isLoading:false,
                orders:action.payload
            };
                

case actiontypes.UPDATE_ORDER_STATUS_FAILURE:
    case actiontypes.GET_RESTAURANTS_ORDER_FAILURE:
        return{
            ...state,isLoading:false,error:action.error
        };

            default:
                return state;
                
    }

};