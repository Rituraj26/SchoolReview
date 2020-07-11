import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { getSchool } from '../../actions/schools';

const SchoolDetails = ({ getSchool, school }) => {
    const { schoolId } = useParams();

    useEffect(() => {
        getSchool({ schoolId });
    }, [getSchool]);

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

            <h4 className="my-4">Related Projects</h4>

            <div className="row">
                <div className="col-md-3 col-sm-6 mb-4">
                    <a href="#">
                        <img
                            className="img-fluid"
                            src="http://placehold.it/500x300"
                            alt=""
                        />
                    </a>
                </div>

                <div className="col-md-3 col-sm-6 mb-4">
                    <a href="#">
                        <img
                            className="img-fluid"
                            src="http://placehold.it/500x300"
                            alt=""
                        />
                    </a>
                </div>

                <div className="col-md-3 col-sm-6 mb-4">
                    <a href="#">
                        <img
                            className="img-fluid"
                            src="http://placehold.it/500x300"
                            alt=""
                        />
                    </a>
                </div>

                <div className="col-md-3 col-sm-6 mb-4">
                    <a href="#">
                        <img
                            className="img-fluid"
                            src="http://placehold.it/500x300"
                            alt=""
                        />
                    </a>
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
