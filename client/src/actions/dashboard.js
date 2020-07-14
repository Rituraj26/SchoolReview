import axios from 'axios';
import {
    UPDATE_PERSONAL_DETAILS,
    UPDATE_PERSONAL_DETAILS_ERROR,
} from './types';
import { setAlert } from './alert';

// Update Personal Details Action

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

        dispatch(setAlert('Update Successful', 'success'));
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

// Update Password Action

export const updatePassword = ({ currentPassword, newPassword }) => async (
    dispatch
) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ currentPassword, newPassword });

    try {
        const res = await axios.put('/auth/updatePassword', body, config);

        dispatch(setAlert('Password Updated Successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
    }
};
