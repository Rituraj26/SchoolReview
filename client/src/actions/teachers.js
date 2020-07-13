import axios from 'axios';
import { GET_TEACHERS, TEACHERS_ERROR } from './types';
import { setAlert } from './alert';

export const getTeachers = () => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get('/teachers', null, config);

        dispatch({
            type: GET_TEACHERS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: TEACHERS_ERROR,
        });
    }
};