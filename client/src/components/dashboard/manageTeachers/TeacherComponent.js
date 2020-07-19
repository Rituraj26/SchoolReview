import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTeacher } from '../../../actions/teachers';

const TeacherComponent = ({ teacher, schoolId, deleteTeacher }) => {
    return (
        <tr>
            <td>{teacher.teacherName}</td>
            <td>{teacher.dept}</td>
            <td>{teacher.exp}</td>
            <td>{teacher.tution.tutionAvailability.toString()}</td>
            {teacher.tution.tutionAvailability ? (
                <td>{teacher.tution.tutionFee}</td>
            ) : (
                <td></td>
            )}
            <td>
                <Link
                    to={`/dashboard/teachers/edit/${teacher._id}`}
                    className="btn btn-secondary"
                >
                    <i className="fas fa-pencil-alt"></i>
                </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteTeacher(schoolId, teacher._id)}
                >
                    <i className="fas fa-times"></i>
                </button>
            </td>
        </tr>
    );
};

TeacherComponent.propTypes = {
    teacher: PropTypes.object.isRequired,
    schoolId: PropTypes.string.isRequired,
    deleteTeacher: PropTypes.func.isRequired,
};

export default connect(null, { deleteTeacher })(TeacherComponent);
