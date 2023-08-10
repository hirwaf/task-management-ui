import {LOADING, USER_LOGGED_IN, USER_ERROR, USER_LOGGED_OUT, USER_REGISTERED} from "../types";
import {login, logout, register} from "../../services/user.service";

export const loginAction = (credentials) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
        const token = await login(credentials);
        if (!token) {
            throw new Error("Invalid credentials");
        }
        dispatch({ type: USER_LOGGED_IN, payload: token });
    } catch (err) {
        dispatch({ type: USER_ERROR, payload: err.message });
    }
    dispatch({ type: LOADING, payload: false });
}

export const logoutAction = (credentials) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
        logout(credentials);
        dispatch({ type: USER_LOGGED_IN, payload: null });
        dispatch({ type: USER_LOGGED_OUT, payload: true });
    } catch (err) {
        dispatch({ type: USER_ERROR, payload: err.message });
    }
    dispatch({ type: LOADING, payload: false });
}
export const registerAction = (data) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    console.log(data)
    try {
        const register_ = await register(data);
        dispatch({ type: USER_REGISTERED, payload: register_ });
    } catch (err) {
        dispatch({ type: USER_ERROR, payload: err.message });
    }
    dispatch({ type: LOADING, payload: false });
}