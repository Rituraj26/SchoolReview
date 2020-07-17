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
} from '../actions/types';

const initialState = {
    count: 0,
    pagination: {},
    schoolData: [],
    school: {},
    isAuthenticated: false,
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_SCHOOLS:
        case GET_SCHOOLS_BY_RADIUS:
        case GET_SCHOOLS_BY_RATING_AND_FOUNDED:
            return {
                ...state,
                count: payload.count,
                pagination: payload.pagination,
                schoolData: payload.data,
                loading: false,
            };
        case GET_SCHOOL:
        case EDIT_SCHOOL:
            return {
                ...state,
                school: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case ADD_SCHOOL:
            state.schoolData.push(payload.data);
            return {
                ...state,
                school: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case DELETE_SCHOOL:
            return {
                ...state,
                count: --state.count,
                schoolData: state.schoolData.filter(
                    (school) => school.user !== payload
                ),
                school: {},
                isAuthenticated: true,
                loading: false,
            };
        case SCHOOLS_ERROR:
        case GET_SCHOOLS_BY_RADIUS_ERROR:
        case GET_SCHOOLS_BY_RATING_AND_FOUNDED_ERROR:
        case GET_SCHOOL_ERROR:
        case ADD_SCHOOL_ERROR:
        case EDIT_SCHOOL_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
