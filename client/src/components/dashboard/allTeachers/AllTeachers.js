import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTeachers } from '../../../actions/teachers';
import TeacherItem from './TeacherItem';

const AllTeachers = ({
    getTeachers,
    teachers: { _id, count, teacherData },
}) => {
    useEffect(() => {
        getTeachers();
    }, [getTeachers]);

    return (
        <div className="row px-5">
            {count > 0 ? (
                teacherData.map((teacher) => (
                    <TeacherItem key={teacher._id} teacher={teacher} />
                ))
            ) : (
                <p>No Teacher Data Available</p>
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
