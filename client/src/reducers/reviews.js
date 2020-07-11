import { GET_REVIEWS, GET_REVIEWS_ERROR } from '../actions/types';

const initialState = {
    count: 0,
    reviewData: [],
    isAuthenticated: false,
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_REVIEWS:
            return {
                ...state,
                count: payload.count,
                isAuthenticated: true,
                reviewData: payload.data,
                loading: false,
            };
        case GET_REVIEWS_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
