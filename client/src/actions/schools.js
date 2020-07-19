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
    EDIT_SCHOOL,
    EDIT_SCHOOL_ERROR,
    DELETE_SCHOOL,
    DELETE_SCHOOL_ERROR,
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

// Get publisher's school

export const getPublisherSchool = (publisherSchool) => (dispatch) => {
    dispatch({
        type: GET_SCHOOL,
        payload: publisherSchool,
    });
};

// Add a School

export const addSchool = (formData) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const {
        schoolName,
        description,
        address,
        phoneNo,
        email,
        website,
        founded,
        admissionFee,
        tutionFee,
        busFee,
        hostelFee,
        scholarshipAvailable,
        toppers,
        awards,
    } = formData;

    const body = JSON.stringify({
        schoolName,
        description,
        address,
        contactUs: {
            email,
            website,
            phoneNo,
        },
        founded,
        feeStructure: {
            admissionFee,
            tutionFee,
            busFee,
            hostelFee,
        },
        scholarshipAvailable,
        toppers,
        awards,
    });

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

// Edit a School

export const editSchool = (formData, schoolId, history) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const {
        schoolName,
        description,
        address,
        email,
        website,
        phoneNo,
        founded,
        admissionFee,
        tutionFee,
        busFee,
        hostelFee,
        scholarshipAvailable,
        toppers,
        awards,
    } = formData;

    const body = JSON.stringify({
        schoolName,
        description,
        address,
        contactUs: {
            email,
            website,
            phoneNo,
        },
        founded,
        feeStructure: {
            admissionFee,
            tutionFee,
            busFee,
            hostelFee,
        },
        scholarshipAvailable,
        toppers,
        awards,
    });

    try {
        const res = await axios.put(`/schools/${schoolId}`, body, config);

        dispatch({
            type: EDIT_SCHOOL,
            payload: res.data,
        });

        dispatch(setAlert('School has been updated successfully', 'success'));

        history.push('/dashboard/school');
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: EDIT_SCHOOL_ERROR,
        });
    }
};

// Delete a School

export const deleteSchool = (schoolId) => async (dispatch, getState) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        await axios.delete(`/schools/${schoolId}`, null, config);

        const { auth } = getState();

        dispatch({
            type: DELETE_SCHOOL,
            payload: auth.user._id,
        });

        dispatch(setAlert('School has been deleted successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: DELETE_SCHOOL_ERROR,
        });
    }
};
