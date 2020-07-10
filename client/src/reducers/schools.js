import { GET_SCHOOLS, SCHOOLS_ERROR } from '../actions/types';

const initialState = {
    count: 0,
    pagination: {},
    schoolData: [],
    isAuthenticated: false,
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    // console.log(payload);
    switch (type) {
        case GET_SCHOOLS:
            return {
                ...state,
                count: payload.count,
                pagination: payload.pagination,
                schoolData: payload.data,
                loading: false,
            };
        case SCHOOLS_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
