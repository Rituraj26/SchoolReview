import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getReviews } from '../../actions/reviews';

import ReviewItem from './ReviewItem';
import AddReview from './AddReview';
import Spinner from '../layout/Spinner';

const Reviews = ({
    getReviews,
    reviews: { count, reviewData, loading },
    school: { schoolName, averageRating },
}) => {
    const { schoolId } = useParams();

    useEffect(() => {
        getReviews(schoolId);
    }, [getReviews, schoolId]);

    return (
        <section className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <Link
                        to={`/schools/${schoolId}`}
                        className="btn btn-secondary my-3"
                    >
                        <i className="fas fa-chevron-left"></i> School Info
                    </Link>
                    <h1 className="mb-4">{schoolName}</h1>

                    {count > 0 ? (
                        reviewData.map((review) => (
                            <ReviewItem key={review._id} review={review} />
                        ))
                    ) : loading ? (
                        <Spinner />
                    ) : (
                        <p>No Reviews Available</p>
                    )}
                </div>

                <div className="col-md-5">
                    <h1 className="text-center my-4">
                        <span className="badge badge-secondary badge-success rounded-circle p-3 mr-4">
                            {averageRating}
                        </span>
                        Rating
                    </h1>

                    <button className="btn btn-primary btn-block my-3">
                        <i className="fas fa-pencil-alt"></i> Review This
                        Bootcamp
                    </button>

                    <div className="row mt-5 m-auto">
                        <AddReview />
                    </div>
                </div>
            </div>
        </section>
    );
};

Reviews.propTypes = {
    getReviews: PropTypes.func.isRequired,
    reviews: PropTypes.object.isRequired,
    school: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews,
        school: state.schools.school,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { getReviews })(Reviews);
