import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SchoolComponent from './SchoolComponent';
import NoSchoolComponent from './NoSchoolComponent';

const ManageSchool = (props) => {
    return (
        <Fragment>
            <SchoolComponent />
            <NoSchoolComponent />
        </Fragment>
    );
};

ManageSchool.propTypes = {};

export default ManageSchool;
