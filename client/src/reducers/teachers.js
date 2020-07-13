import { GET_TEACHERS, TEACHERS_ERROR } from '../actions/types';

const initialState = {
    count: 0,
    teacherData: [],
    isAuthenticated: false,
    loading: true,
};

export default (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case GET_TEACHERS:
            return {
                ...state,
                count: payload.count,
                teacherData: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case TEACHERS_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
