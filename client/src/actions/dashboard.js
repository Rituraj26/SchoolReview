import axios from 'axios';
import {
    UPDATE_PERSONAL_DETAILS,
    UPDATE_PERSONAL_DETAILS_ERROR,
} from './types';
import { setAlert } from './alert';

export const updatePersonalDetails = ({ name, email }) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ name, email });

    try {
        const res = await axios.put('/auth/updateDetails', body, config);

        dispatch({
            type: UPDATE_PERSONAL_DETAILS,
            payload: res.data,
        });

        dispatch(setAlert('Update Successfull', 'success'));
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: UPDATE_PERSONAL_DETAILS_ERROR,
        });
    }
};
