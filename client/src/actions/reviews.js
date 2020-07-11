import axios from 'axios';
import { GET_REVIEWS, GET_REVIEWS_ERROR } from './types';
import { setAlert } from './alert';

export const getReviews = (schoolId) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        console.log('Jofhwoij');
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
            errors.forEach((error) => setAlert(dispatch(error, 'danger')));
        }

        dispatch({
            type: GET_REVIEWS_ERROR,
        });
    }
};
