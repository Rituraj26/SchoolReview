import {
    GET_TEACHERS,
    TEACHERS_ERROR,
    ADD_TEACHER,
    ADD_TEACHER_ERROR,
} from '../actions/types';

const initialState = {
    count: 0,
    teacherData: [],
    teacher: {},
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
        case ADD_TEACHER:
            state.teacherData.push(payload.data);
            return {
                ...state,
                count: ++state.count,
                teacher: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case TEACHERS_ERROR:
        case ADD_TEACHER_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
