import axios from 'axios';
import {
    GET_TEACHERS,
    TEACHERS_ERROR,
    ADD_TEACHER,
    ADD_TEACHER_ERROR,
} from './types';
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

// Add a Teacher

export const addTeacher = (formData, schoolId) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const {
        teacherName,
        photo,
        dept,
        exp,
        tutionAvailability,
        tutionFee,
        email,
        phoneNo,
        address,
    } = formData;

    const body = JSON.stringify({
        teacherName,
        photo,
        dept,
        exp,
        tution: {
            tutionAvailability,
            tutionFee,
        },
        contactUs: {
            email,
            phoneNo,
        },
        address,
    });

    try {
        const res = await axios.post(
            `/schools/${schoolId}/teachers`,
            body,
            config
        );

        dispatch({
            type: ADD_TEACHER,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: ADD_TEACHER_ERROR,
        });
    }
};
