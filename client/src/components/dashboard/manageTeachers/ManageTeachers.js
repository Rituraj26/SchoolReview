import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPublisherSchool } from '../../../actions/schools';

import TeacherComponent from './TeacherComponent';
import NoTeacherComponent from './NoTeacherComponent';

const ManageTeachers = ({
    schools: { count, schoolData },
    user,
    getPublisherSchool,
    school,
}) => {
    useEffect(() => {
        if (count !== 0) {
            const school = schoolData.filter(
                (school) => school.user === user._id
            );
            if (school.length) {
                const schoolData = { data: school[0] };
                getPublisherSchool(schoolData);
            }
        }
    }, [getPublisherSchool]);

    return (
        <section className="container mt-5">
            <div className="row">
                <div className="col-md-8 ml-3">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <Link
                                to="/dashboard/school"
                                className="btn btn-link text-secondary my-3"
                            >
                                <i className="fas fa-chevron-left"></i> Manage
                                School
                            </Link>
                            <h1 className="mb-4">Manage Teachers</h1>
                            <div className="card mb-3">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img
                                            src="img/image_1.jpg"
                                            className="card-img"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link
                                                    to={`/schools/${school._id}`}
                                                >
                                                    {school.schoolName}
                                                    <span className="float-right badge badge-success">
                                                        {school.averageRating}
                                                    </span>
                                                </Link>
                                            </h5>
                                            <span className="badge badge-dark mb-2">
                                                {Object.keys(school).length
                                                    ? school.address.substring(
                                                          0,
                                                          30
                                                      ) + '...'
                                                    : ''}
                                            </span>
                                            <p className="card-text">
                                                Web Development, UI/UX, Mobile
                                                Development
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/dashboard/teachers/add"
                                className="btn btn-primary btn-block mb-4"
                            >
                                Add Bootcamp Course
                            </Link>

                            {Object.keys(school).length &&
                            school.teachers.length ? (
                                <TeacherComponent />
                            ) : (
                                <NoTeacherComponent />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ManageTeachers.propTypes = {
    schools: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getPublisherSchool: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        schools: state.schools,
        user: state.auth.user,
        getPublisherSchool,
        school: state.schools.school,
    };
};

export default connect(mapStateToProps, { getPublisherSchool })(ManageTeachers);
