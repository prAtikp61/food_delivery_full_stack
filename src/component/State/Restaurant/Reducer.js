import { isPresentInFavorites } from "../../config/logic";
import * as actiontypes  from "./ActionType";

const initialState = {
  restaurants:[],
 usersRestaurant:null,
  restaurant:null,
  isLoading:false,
  error:null,
  events:[null],
  restaurantEvents:[],
  categories:[],
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.CREATE_RESTAURANT_REQUEST:
    case actiontypes.GET_ALL_RESTAURANT_REQUEST: 
    case actiontypes.DELETE_RESTAURANT_REQUEST:
    case actiontypes.UPDATE_RESUTARANT_REQUEST:
    case actiontypes.GET_RESTAURANT_BY_ID_REQUEST:
    case actiontypes.CREATE_CATEGORY_REQUEST:
    case actiontypes.GET_RESTAURANTS_CATEGORY_REQUEST:
      return { 
        ...state,
        isLoading: true,
         error: null
        };

    case actiontypes.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersRestaurant:action.payload
      };


    case actiontypes.GET_ALL_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants:action.payload,
      };


    case actiontypes.GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurant:action.payload,
      };

    case actiontypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
    case actiontypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
    case actiontypes.UPDATE_RESTAURANT_SUCCESS:
        return {
            ...state,
            isLoading:false,
            usersRestaurant:action.payload,
        };

    case actiontypes.DELETE_RESTAURANT_SUCCESS:
        return{
            ...state,
            error:null,
            isLoading:false,
            restaurants:state.restaurants.filter(
                (item)=>item.id !== action.payload
            ),
            usersRestaurant:state.usersRestaurant.filter(
                (item) => item.id !== action.payload
            ),
        };
    
    case actiontypes.CREATE_EVENTS_SUCCESS:
        return {
            ...state,
            isLoading:false
      
        };

    case actiontypes.GET_ALL_EVENTS_SUCCESS:
        return {
            ...state,
            isLoading:false,
            events:action.payload,
           
        };

 case actiontypes.GET_RESTAURANTS_EVENTS_SUCCESS:
        return {
            ...state,
            isLoading:false,
            restaurantEvents:action.payload,
           
        };

        
    case actiontypes.DELETE_EVENT_SUCCESS:
        return{
            ...state,
            isLoading:false,
            events:state.events.filter(
                (item)=>item.id !== action.payload
            ),
        };
     
        case actiontypes.CREATE_CATEGORY_SUCCESS:
        return {
            ...state,
            isLoading:false,
          
        };

         case actiontypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
        return {
            ...state,
            isLoading:false,
            categories:action.payload,
           
        };

    case actiontypes.DELETE_EVENT_FAILURE:
    case actiontypes.CREATE_EVENTS_FAILURE:
    case actiontypes.GET_ALL_EVENTS_FAILURE:
    case actiontypes.CREATE_CATEGORY_FAILURE:
    case actiontypes.CREATE_RESTAURANT_FAILURE:
    case actiontypes.DELETE_RESTAURANT_FAILURE:
    case actiontypes.UPDATE_RESTAURANT_FAILURE:
    case actiontypes.GET_ALL_RESTAURANT_FAILURE:
    case actiontypes.GET_RESTAURANT_BY_ID_FAILURE:
    case actiontypes.GET_RESTAURANTS_EVENTS_FAILURE:
    case actiontypes.GET_RESTAURANTS_CATEGORY_FAILURE:
    case actiontypes.UPDATE_RESTAURANT_STATUS_FAILURE:
    case actiontypes.GET_RESTAURANT_BY_USER_ID_FAILURE:
       return{
            ...state,
            isLoading:false,
            error:action.payload,
         };
    
    default:
      return state;
  }
};
