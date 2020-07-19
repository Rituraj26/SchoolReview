import axios from 'axios';
import {
    GET_TEACHERS,
    TEACHERS_ERROR,
    GET_SCHOOL_TEACHERS,
    GET_SCHOOL_TEACHERS_ERROR,
    ADD_TEACHER,
    ADD_TEACHER_ERROR,
    EDIT_TEACHER,
    EDIT_TEACHER_ERROR,
    DELETE_TEACHER,
    DELETE_TEACHER_ERROR,
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

// Get School Teachers

export const getSchoolTeachers = (schoolId) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(
            `/schools/${schoolId}/teachers`,
            null,
            config
        );

        dispatch({
            type: GET_SCHOOL_TEACHERS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: GET_SCHOOL_TEACHERS_ERROR,
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

// Edit a Teacher

export const editTeacher = (formData, schoolId, teacherId) => async (
    dispatch
) => {
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
        const res = await axios.put(
            `/schools/${schoolId}/teachers/${teacherId}`,
            body,
            config
        );
        console.log(res.data);

        dispatch({
            type: EDIT_TEACHER,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: EDIT_TEACHER_ERROR,
        });
    }
};

// Delete a Teacher

export const deleteTeacher = (schoolId, teacherId) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        await axios.delete(
            `/schools/${schoolId}/teachers/${teacherId}`,
            null,
            config
        );

        dispatch({
            type: DELETE_TEACHER,
            payload: { teacherId },
        });

        dispatch(setAlert(`Teacher has been Deleted Successfully`, 'success'));
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: DELETE_TEACHER_ERROR,
        });
    }
};
