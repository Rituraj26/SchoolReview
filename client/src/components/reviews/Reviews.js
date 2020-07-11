import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getReviews } from '../../actions/reviews';
import ReviewItem from './ReviewItem';

const Reviews = ({
    getReviews,
    reviews: { count, reviewData },
    school: { averageRating },
}) => {
    const { schoolId } = useParams();

    useEffect(() => {
        getReviews(schoolId);
    }, [getReviews]);

    return (
        <section className="bootcamp mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Link
                            to={`/schools/${schoolId}`}
                            className="btn btn-secondary my-3"
                        >
                            <i className="fas fa-chevron-left"></i> Bootcamp
                            Info
                        </Link>
                        <h1 className="mb-4">DevWorks Bootcamp Reviews</h1>

                        {count > 0 ? (
                            reviewData.map((review) => (
                                <ReviewItem key={review._id} review={review} />
                            ))
                        ) : (
                            <p>No Review Found</p>
                        )}
                    </div>

                    <div className="col-md-4">
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
    };
};

export default connect(mapStateToProps, { getReviews })(Reviews);
