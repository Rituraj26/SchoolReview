import axios from 'axios';
import { GET_SCHOOLS, SCHOOLS_ERROR } from './types';
import { setAlert } from './alert';

export const getSchools = (page) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(`/schools?page=${page}`, null, config);
        console.log(res.data);

        dispatch({
            type: GET_SCHOOLS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: SCHOOLS_ERROR,
        });
    }
};
