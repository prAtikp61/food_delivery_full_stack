import { act } from "react";
import * as actiontypes  from "./ActionType";

const initialState = {
    menuItems:[],
    search:[],
    isLoading:false,
    error:null,
    usersRestaurant:null,
    message:null,
};

export const menuItemReducer =(state=initialState,action)=>{
switch(action.type){
    case actiontypes.CREATE_MENU_ITEM_REQUEST:
        case actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
            case actiontypes.DELETE_MENU_ITEM_REQUEST:
                case actiontypes.SEARCH_MENU_ITEM_REQUEST:
                    case actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
                        return{
                            ...state,
                            isLoading:true, // ← FIXED: should be true when loading
                            error:null,
                            message:null,
                        }
  case actiontypes.CREATE_MENU_ITEM_SUCCESS:
    return{
        ...state,
        isLoading:false,
        menuItems:[...state.menuItems, action.payload], // ← FIXED: typo in 'paylaoad' and 'state,menuItems'
        message:"Food Created Successfully"
    };

       case actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
                        return{
                            ...state,
                            isLoading:false,
                            menuItems:action.payload, // ← FIXED: typo in 'paylaoad'
                        }

                         case actiontypes.DELETE_MENU_ITEM_SUCCESS:
                        return{
                            ...state,
                            isLoading:false,
                            menuItems:state.menuItems.filter(
                                (menuItem)=> menuItem.id !== action.payload // ← FIXED: typo in 'paylaoad'
                            ),
                        }
                        case actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
                            console.log("updated ",action.payload.id)
                        return{
                            ...state,
                            isLoading:false,
                            menuItems:state.menuItems.map( // ← FIXED: should use map, not filter
                                (menuItem)=> menuItem.id === action.payload.id ? action.payload : menuItem // ← FIXED: typo in 'paylaoad'
                            ),
                        };

                           case actiontypes.SEARCH_MENU_ITEM_SUCCESS:
                        return{
                            ...state,
                            isLoading:false,
                            search:action.payload, // ← FIXED: typo in 'paylaoad'
                        }

                        case actiontypes.CREATE_MENU_ITEM_FAILURE:
                              case actiontypes.DELETE_MENU_ITEM_FAILURE:
                                  case actiontypes.SEARCH_MENU_ITEM_FAILURE:
                                      case actiontypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
                                          case actiontypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
           return{
            ...state,
            isLoading:false,
            error:action.payload,
         };

             default:
      return state;
}
}