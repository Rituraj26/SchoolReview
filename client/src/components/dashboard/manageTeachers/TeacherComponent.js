import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TeacherComponent = () => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Front End Web Development</td>
                    <td>
                        <Link
                            to="/dashboard/teachers/edit"
                            className="btn btn-secondary"
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

TeacherComponent.propTypes = {
    teachers: PropTypes.object.isRequired,
};

export default TeacherComponent;
