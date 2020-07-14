import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PERSONAL_DETAILS,
    UPDATE_PERSONAL_DETAILS_ERROR,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
        case UPDATE_PERSONAL_DETAILS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.data,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.data);
            return {
                ...state,
                token: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            // console.log(state);
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};
