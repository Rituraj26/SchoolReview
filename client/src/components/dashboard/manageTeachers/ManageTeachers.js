import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSchoolTeachers } from '../../../actions/teachers';

import TeacherComponent from './TeacherComponent';
import NoTeacherComponent from './NoTeacherComponent';
import NoSchoolComponent from '../manageSchool/NoSchoolComponent';

const ManageTeachers = ({
    publisherSchool,
    getSchoolTeachers,
    schoolTeachers,
}) => {
    useEffect(() => {
        getSchoolTeachers(publisherSchool._id);
    }, [getSchoolTeachers]);

    return (
        <section className="container mt-5">
            <div className="row">
                <div className="col-md-10 ml-3">
                    <div className="card bg-white py-2 px-4">
                        {Object.keys(publisherSchool).length === 0 ? (
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
                                                        to={`/schools/${publisherSchool._id}`}
                                                    >
                                                        {
                                                            publisherSchool.schoolName
                                                        }
                                                        <span className="float-right badge badge-success">
                                                            {
                                                                publisherSchool.averageRating
                                                            }
                                                        </span>
                                                    </Link>
                                                </h5>
                                                <span className="badge badge-dark mb-2">
                                                    {publisherSchool.address.substring(
                                                        0,
                                                        30
                                                    )}
                                                </span>
                                                <p className="card-text">
                                                    Web Development, UI/UX,
                                                    Mobile Development
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
    publisherSchool: PropTypes.object.isRequired,
    getSchoolTeachers: PropTypes.func.isRequired,
    schoolTeachers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        publisherSchool: state.schools.school,
        schoolTeachers: state.teachers.schoolTeachers,
    };
};

export default connect(mapStateToProps, { getSchoolTeachers })(ManageTeachers);
