import axios from 'axios';
import {
    UPDATE_PERSONAL_DETAILS,
    UPDATE_PERSONAL_DETAILS_ERROR,
} from './types';

export const updatePersonalDetails = ({ name, email }) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.parse({ name, email });

    try {
        const res = await axios.put('/auth/updateDetails', body, config);
        console.log(res.data);
    } catch (err) {
        console.log(err.response);
    }
};
