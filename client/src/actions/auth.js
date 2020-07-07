import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

export const register = ({ name, email, role, password }) => async (
    dispatch
) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ name, email, role, password });
    try {
        const res = await axios.post('/auth/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};
