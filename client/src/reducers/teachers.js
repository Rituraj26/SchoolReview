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
} from '../actions/types';

const initialState = {
    count: 0,
    allTeachers: [],
    schoolTeachers: [],
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
                allTeachers: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case GET_SCHOOL_TEACHERS:
            return {
                ...state,
                count: payload.count,
                schoolTeachers: payload.data,
                isAuthenticated: true,
                loading: false,
            };
        case ADD_TEACHER:
            state.allTeachers.push(payload.data);
            state.schoolTeachers.push(payload.data);
            return {
                ...state,
                count: ++state.count,
                isAuthenticated: true,
                loading: false,
            };
        case EDIT_TEACHER:
            let ind;
            state.schoolTeachers.forEach((teacher, index) => {
                if (payload.data._id === teacher._id) {
                    ind = index;
                }
            });
            state.schoolTeachers[ind] = payload.data;
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case DELETE_TEACHER:
            state.schoolTeachers = state.schoolTeachers.filter(
                (teacher) => payload.teacherId !== teacher._id
            );
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case TEACHERS_ERROR:
        case GET_SCHOOL_TEACHERS_ERROR:
        case ADD_TEACHER_ERROR:
        case EDIT_TEACHER_ERROR:
        case DELETE_TEACHER_ERROR:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        default:
            return state;
    }
};
