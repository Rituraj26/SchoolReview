import axios from 'axios';
import {
    GET_SCHOOLS,
    SCHOOLS_ERROR,
    GET_SCHOOLS_BY_RADIUS,
    GET_SCHOOLS_BY_RADIUS_ERROR,
    GET_SCHOOLS_BY_RATING_AND_FOUNDED,
    GET_SCHOOLS_BY_RATING_AND_FOUNDED_ERROR,
    GET_SCHOOL,
    GET_SCHOOL_ERROR,
    ADD_SCHOOL,
    ADD_SCHOOL_ERROR,
} from './types';
import { setAlert } from './alert';

export const getSchools = (page) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(`/schools?page=${page}`, null, config);
        // console.log(res.data);

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

export const getSchoolByRadius = ({ zipcode, distance }) => async (
    dispatch
) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(
            `/schools/radius/${zipcode}/${distance}`,
            null,
            config
        );
        // console.log(res.data);

        dispatch({
            type: GET_SCHOOLS_BY_RADIUS,
            payload: res.data,
        });
    } catch (err) {
        // console.log(err);
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: GET_SCHOOLS_BY_RADIUS_ERROR,
        });
    }
};

export const getSchoolByRatingAndFounded = ({ rating, founded }) => async (
    dispatch
) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(
            `/schools?averageRating[gte]=${rating}&&founded[gte]=${founded}&&limit=10`,
            null,
            config
        );

        dispatch({
            type: GET_SCHOOLS_BY_RATING_AND_FOUNDED,
            payload: res.data,
        });
    } catch (err) {
        // console.log(err.response);
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: GET_SCHOOLS_BY_RATING_AND_FOUNDED_ERROR,
        });
    }
};

// Get a particular school

export const getSchool = ({ schoolId }) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(`/schools/${schoolId}`, null, config);

        dispatch({
            type: GET_SCHOOL,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: GET_SCHOOL_ERROR,
        });
    }
};

// Add a School

export const addSchool = (formData) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post('/schools', body, config);

        dispatch({
            type: ADD_SCHOOL,
            payload: res.data,
        });

        dispatch(setAlert('School has been added successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: ADD_SCHOOL_ERROR,
        });
    }
};

// Get publisher's school

export const getPublisherSchool = (school) => (dispatch) => {
    dispatch({
        type: GET_SCHOOL,
        payload: school,
    });
};
