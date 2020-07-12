import {
    GET_REVIEWS,
    GET_REVIEWS_ERROR,
    ADD_REVIEW,
    ADD_REVIEW_ERROR,
} from '../actions/types';

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
        case ADD_REVIEW:
            state.count++;
            state.reviewData.push(payload.data);
            return {
                ...state,
                count: state.count,
                reviewData: state.reviewData,
                isAuthenticated: true,
                loading: false,
            };
        case GET_REVIEWS_ERROR:
        case ADD_REVIEW_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
