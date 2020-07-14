import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchools } from '../../../actions/schools';

import SchoolComponent from './SchoolComponent';
import NoSchoolComponent from './NoSchoolComponent';

const ManageSchool = ({ getSchools, schools: { count, schoolData }, user }) => {
    useEffect(() => {
        getSchools();
    }, []);

    const findSchool = () => {
        if (count !== 0) {
            const school = schoolData.filter(
                (school) => school.user === user._id
            );
            if (school.length) {
                return <SchoolComponent school={school[0]} />;
            }
            return <NoSchoolComponent />;
        }
        return <div>No School Available</div>;
    };

    return <Fragment>{findSchool()}</Fragment>;
};

ManageSchool.propTypes = {
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        schools: state.schools,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { getSchools })(ManageSchool);
