import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getSchoolTeachers } from '../../../actions/teachers';

import TeacherComponent from './TeacherComponent';
import NoTeacherComponent from './NoTeacherComponent';
import NoSchoolComponent from '../manageSchool/NoSchoolComponent';

const ManageTeachers = ({ school, getSchoolTeachers, schoolTeachers }) => {
    useEffect(() => {
        getSchoolTeachers(school._id);
    }, [getSchoolTeachers]);

    const history = useHistory();

    const onClick = (schoolId) => {
        history.push(`/schools/${schoolId}`);
    };

    return (
        <section className="container mt-5">
            <div className="row">
                <div className="col-md-10 ml-3">
                    <div className="card bg-white py-2 px-4">
                        {Object.keys(school).length === 0 ? (
                            <NoSchoolComponent />
                        ) : (
                            <div className="card-body">
                                <Link
                                    to="/dashboard/school"
                                    className="btn btn-link text-secondary my-3"
                                >
                                    <i className="fas fa-chevron-left"></i>{' '}
                                    Manage School
                                </Link>
                                <h1 className="mb-4">Manage Teachers</h1>
                                <div className="card mb-3 mt-4">
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img
                                                src={
                                                    school.schoolPhoto.photoPath
                                                }
                                                className="card-img"
                                                alt={
                                                    school.schoolPhoto.photoName
                                                }
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <h5 className="card-title">
                                                    <span
                                                        className="pointer"
                                                        onClick={() =>
                                                            onClick(school._id)
                                                        }
                                                    >
                                                        {school.schoolName}
                                                    </span>
                                                    <span className="float-right badge badge-success">
                                                        {school.averageRating}
                                                    </span>
                                                </h5>

                                                <p className="card-text">
                                                    {school.description.substring(
                                                        0,
                                                        160
                                                    ) + '...'}
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        {school.address.substring(
                                                            0,
                                                            60
                                                        ) + '...'}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to="/dashboard/teachers/add"
                                    className="btn btn-primary btn-block mb-4"
                                >
                                    Add Teacher Details For Your School
                                </Link>

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Dept</th>
                                            <th scope="col">Exp</th>
                                            <th scope="col">
                                                Tution Availability
                                            </th>
                                            <th scope="col">Tution Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schoolTeachers.length ? (
                                            schoolTeachers.map((teacher) => (
                                                <TeacherComponent
                                                    key={teacher._id}
                                                    teacher={teacher}
                                                    schoolId={school._id}
                                                />
                                            ))
                                        ) : (
                                            <NoTeacherComponent />
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

ManageTeachers.propTypes = {
    school: PropTypes.object.isRequired,
    getSchoolTeachers: PropTypes.func.isRequired,
    schoolTeachers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        school: state.schools.school,
        schoolTeachers: state.teachers.schoolTeachers,
    };
};

export default connect(mapStateToProps, { getSchoolTeachers })(ManageTeachers);
