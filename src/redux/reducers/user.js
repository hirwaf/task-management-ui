import {LOADING, USER_ERROR, USER_LOGGED_IN, USER_LOGGED_OUT, USER_REGISTERED} from "../types";

const init = {
    loading: false,
    error: "",
};
export const userReducer = (state = init, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case USER_ERROR:
            return {
              ...state,
                error: action.payload,
            };
        case USER_REGISTERED:
            return {
                ...state,
                user: action.payload
            }
        case USER_LOGGED_OUT:
            return {
               ...state,
                isLogged: false
            }
        case USER_LOGGED_IN:
            return {
              ...state,
                isLogged: true,
                token: action.payload
            }
        default:
            return state;
    }
};