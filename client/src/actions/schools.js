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
    UPLOAD_SCHOOL_PHOTO,
    UPLOAD_SCHOOL_PHOTO_ERROR,
} from './types';
import { setAlert } from './alert';

// Get All Schools

export const getSchools = (page) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axios.get(`/schools?page=${page}`, null, config);

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

// Get School Within a Particular Radius of the Zipcode

export const getSchoolByRadius = ({ zipcode, distance }, history) => async (
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

        dispatch({
            type: GET_SCHOOLS_BY_RADIUS,
            payload: res.data,
        });

        history.push('/schools');
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: GET_SCHOOLS_BY_RADIUS_ERROR,
        });
    }
};

// Get Schools By Ratings and Founded Year

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

export const addSchool = (formData, history) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const {
        schoolName,
        description,
        photoName,
        photoPath,
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
        schoolPhoto: {
            photoName,
            photoPath,
        },
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

        history.push('/dashboard/main');

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

        history.push('/dashboard/main');
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

// Upload Photo for a School

export const schoolPhotoUpload = (schoolId, file, history) => async (
    dispatch
) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
        const res = await axios.put(`/schools/${schoolId}/photo`, file, config);

        dispatch({
            type: UPLOAD_SCHOOL_PHOTO,
            payload: res.data,
        });

        dispatch(
            setAlert('School Photo has been uploaded successfully', 'success')
        );

        history.push('/dashboard/main');
    } catch (err) {
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: UPLOAD_SCHOOL_PHOTO_ERROR,
        });
    }
};
