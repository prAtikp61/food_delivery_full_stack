import * as actiontypes from "./ActionType";

const initialState = {
    orders: [],
    currentOrder: null,  // to store the latest created order
    isLoading: false,
    error: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // Fetch user orders
        case actiontypes.GET_USERS_ORDERS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case actiontypes.GET_USERS_ORDERS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                orders: payload,
            };
        case actiontypes.GET_USERS_ORDERS_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };

        // Create order
        case actiontypes.CREATE_ORDER_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case actiontypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                currentOrder: payload, // store the newly created order
                orders: [...state.orders, payload], // optionally add it to orders list
            };
        case actiontypes.CREATE_ORDER_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };

        default:
            return state;
    }
};
