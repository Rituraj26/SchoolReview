import axios from 'axios';
import {
    GET_REVIEWS,
    GET_REVIEWS_ERROR,
    ADD_REVIEW_ERROR,
    ADD_REVIEW,
} from './types';
import { setAlert } from './alert';

export const getReviews = (schoolId) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(
            `/schools/${schoolId}/reviews`,
            null,
            config
        );

        dispatch({
            type: GET_REVIEWS,
            payload: res.data,
        });
    } catch (err) {
        // console.log(err.response);
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: GET_REVIEWS_ERROR,
        });
    }
};

// Action to Add Review
export const addReview = ({ rating, title, description }, schoolId) => async (
    dispatch
) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ rating, title, description });

    try {
        const res = await axios.post(
            `/schools/${schoolId}/reviews`,
            body,
            config
        );

        dispatch({
            type: ADD_REVIEW,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: ADD_REVIEW_ERROR,
        });
    }
};
