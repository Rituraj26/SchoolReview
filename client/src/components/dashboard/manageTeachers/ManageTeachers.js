import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TeacherComponent from './TeacherComponent';
import NoTeacherComponent from './NoTeacherComponent';

const ManageTeachers = (props) => {
    return (
        <Fragment>
            <TeacherComponent />
            <NoTeacherComponent />
        </Fragment>
    );
};

ManageTeachers.propTypes = {};

export default ManageTeachers;
