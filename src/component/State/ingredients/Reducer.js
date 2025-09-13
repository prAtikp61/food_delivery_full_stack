import { act } from "react";
import * as actiontypes  from "./Actiontype";

const initialState = {
    ingredients:[],
    update:null,
    category:[],
 
};

export const ingredientReducer=(state=initialState,action)=>{

    switch(action.type){
        case actiontypes.GET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.payload,
            
            };
               case actiontypes.GET_INGREDIENTS_CATEGORY_SUCCESS:
                 return{
                ...state,
                category:action.payload
            };
                   case actiontypes.CREATE_INGREDIENT_CATEGORY_SUCCESS:
                     return{
                ...state,
                category:[...state.category,action.payload],
            };

                     case actiontypes.CREATE_INGREDIENT_SUCCESS:
                     return{
                ...state,
                ingredients:[...state.ingredients,action.payload],
            };

            case actiontypes.UPDATE_STOCK:
                return{
                    ...state,
                    ingredients:state.ingredients.map((item)=>item.id === action.payload.id ?action.payload:item),
                };

            default:
                return state;
                
    }

};