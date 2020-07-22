import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTeachers } from '../../../actions/teachers';
import TeacherItem from './TeacherItem';
import Spinner from '../../layout/Spinner';

const AllTeachers = ({
    getTeachers,
    teachers: { count, allTeachers, loading },
}) => {
    useEffect(() => {
        getTeachers();
    }, [getTeachers]);

    return (
        <div className="row px-5">
            {count > 0 || loading ? (
                allTeachers.map((teacher) => (
                    <TeacherItem key={teacher._id} teacher={teacher} />
                ))
            ) : count > 0 ? (
                <Spinner />
            ) : (
                <h2>No Teacher Data Available</h2>
            )}
        </div>
    );
};

AllTeachers.propTypes = {
    getTeachers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        teachers: state.teachers,
    };
};

export default connect(mapStateToProps, { getTeachers })(AllTeachers);
