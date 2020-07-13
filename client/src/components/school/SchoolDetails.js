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
            <h1 className="my-4">{school.name}</h1>
            <div className="row">
                <div className="col-md-8">
                    <img
                        className="img-fluid"
                        src="http://placehold.it/750x500"
                        alt=""
                    />
                </div>

                <div className="col-md-4">
                    <h4 className="my-3">
                        Founded:{' '}
                        <small className="ml-2">{school.founded}</small>
                    </h4>
                    <h4 className="my-3">
                        Address:{' '}
                        <small className="ml-2">
                            {school.location.formattedAddress}
                        </small>
                    </h4>
                    <h4 className="my-3">
                        Scholarship Available:{' '}
                        <small className="ml-2 text-capitalize">
                            {school.scholarshipAvailable.toString()}
                        </small>
                    </h4>
                    <h4 className="text-center my-4">
                        <span className="badge badge-secondary badge-success rounded-circle p-3">
                            {school.averageRating}
                        </span>{' '}
                        Rating
                    </h4>

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
                    <Link
                        to={school.contactUs.website}
                        target="_blank"
                        className="btn btn-secondary btn-block my-3"
                    >
                        <i className="fas fa-globe"></i> Visit Website
                    </Link>
                </div>
            </div>

            {/* Fee Structure Row */}

            <h4 className="my-4">Fee Structure</h4>

            <div className="row">
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card border-success mb-3">
                        <div className="card-header bg-transparent border-success">
                            Bus Fee
                        </div>
                        <div className="card-body text-success">
                            <h5 className="card-title">
                                Rs. {school.fees.busFee}
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
                                Rs. {school.fees.tutionFee}
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
                                Rs. {school.fees.admissionFee}
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
                                Rs. {school.fees.hostelFee}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toppers Row */}

            <h4 className="my-4">Toppers</h4>

            <div className="row">
                <SchoolTopper toppers={school.toppers} />
                <SchoolTopper toppers={school.toppers} />
                <SchoolTopper toppers={school.toppers} />
                <SchoolTopper toppers={school.toppers} />
            </div>

            {/* Teachers Row */}

            <h4 className="my-4">Teachers</h4>

            <div className="row">
                {school.teachers.length > 0 ? (
                    school.teachers.map((teacher) => (
                        <SchoolTeacher teacher={teacher} />
                    ))
                ) : (
                    <p>No Teacher Data Available</p>
                )}
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
