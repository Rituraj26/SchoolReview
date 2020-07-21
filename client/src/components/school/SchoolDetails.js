import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { getSchool } from '../../actions/schools';
import SchoolTopper from './SchoolTopper';
import SchoolTeacher from './SchoolTeacher';

const SchoolDetails = ({ getSchool, school }) => {
    const { schoolId } = useParams();

    useEffect(() => {
        getSchool({ schoolId });
    }, [getSchool, schoolId]);

    if (Object.keys(school).length === 0) {
        return <h1>No School Available</h1>;
    }

    return (
        <div className="container">
            <h1 className="my-4 display-4">{school.schoolName}</h1>
            <div className="row">
                <div className="col-md-8">
                    <img
                        className="img-fluid"
                        src={school.schoolPhoto.photoPath}
                        alt={school.schoolPhoto.photoName}
                    />
                </div>

                <div className="col-md-4">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Founded</td>
                                <td>{school.founded}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{school.address}</td>
                            </tr>
                            <tr>
                                <td>Scholarship Availability</td>
                                <td>
                                    {school.scholarshipAvailable.toString()}
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle">Rating</td>
                                <td className="h4">
                                    <span className="badge badge-secondary badge-success rounded-circle p-3">
                                        {school.averageRating}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Link
                        to={`/schools/${school._id}/reviews`}
                        className="btn btn-dark btn-block my-3"
                    >
                        <i className="fas fa-comments"></i> Read Reviews
                    </Link>
                    <Link
                        to={`/schools/${school._id}/reviews`}
                        className="btn btn-light btn-block my-3"
                    >
                        <i className="fas fa-pencil-alt"></i> Write a Review
                    </Link>
                    <a
                        href={school.contactUs.website}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="btn btn-secondary btn-block my-3"
                    >
                        <i className="fas fa-globe"></i> Visit Website
                    </a>
                </div>
            </div>

            {/* About School */}

            <div className="card border-0 bg-white my-5 p-5">
                <div className="card-body">
                    <h4 className="mb-4">About</h4>

                    <p>{school.description}</p>
                </div>
            </div>

            {/* Contact Us */}

            <div className="my-5 bg-white p-5">
                <h4 className="mb-4">Contact Us</h4>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{school.contactUs.email}</td>
                        </tr>
                        <tr>
                            <td>Phone No</td>
                            <td>{school.contactUs.phoneNo}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>
                                <Link to={school.contactUs.website}>
                                    {school.contactUs.website}
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Fee Structure Row */}

            <div className="bg-white my-5 p-5">
                <h4 className="mb-4">Fee Structure</h4>

                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card border-success mb-3">
                            <div className="card-header bg-transparent border-success">
                                Bus Fee
                            </div>
                            <div className="card-body text-success">
                                <h5 className="card-title">
                                    {school.feeStructure.busFee}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card border-success mb-3">
                            <div className="card-header bg-transparent border-success">
                                Tution Fee
                            </div>
                            <div className="card-body text-success">
                                <h5 className="card-title">
                                    {school.feeStructure.tutionFee}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card border-success mb-3">
                            <div className="card-header bg-transparent border-success">
                                Admission Fee
                            </div>
                            <div className="card-body text-success">
                                <h5 className="card-title">
                                    {school.feeStructure.admissionFee}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card border-success mb-3">
                            <div className="card-header bg-transparent border-success">
                                Hostel Fee
                            </div>
                            <div className="card-body text-success">
                                <h5 className="card-title">
                                    {school.feeStructure.hostelFee}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toppers Row */}

            <div className="bg-white my-5 p-5">
                <h4 className="mb-4">Toppers</h4>

                <div className="row">
                    {school.toppers.length > 0 ? (
                        school.toppers.map((
                            topper // key needs to be changed when updating topper and teacher
                        ) => (
                            <SchoolTopper key={Math.random()} topper={topper} />
                        ))
                    ) : (
                        <p className="ml-3">No Toppers Data Available</p>
                    )}
                </div>
            </div>

            {/* Teachers Row */}

            <div className="bg-white my-5 p-5">
                <h4 className="mb-4">Teachers</h4>

                <div className="row">
                    {school.teachers.length > 0 ? (
                        school.teachers.map((teacher) => (
                            <SchoolTeacher
                                key={teacher._id}
                                teacher={teacher}
                            />
                        ))
                    ) : (
                        <p className="ml-3">No Teacher Data Available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

SchoolDetails.propTypes = {
    getSchool: PropTypes.func.isRequired,
    school: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        school: state.schools.school,
    };
};

export default connect(mapStateToProps, { getSchool })(SchoolDetails);
