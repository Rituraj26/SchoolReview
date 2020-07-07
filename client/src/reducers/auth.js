import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    // console.log(localStorage.getItem('token'));
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.data);
            return {
                ...state,
                token: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
};
