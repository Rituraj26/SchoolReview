import React from 'react';
import PropTypes from 'prop-types';

const ReviewItem = ({ review }) => {
    return (
        <div className="card mb-3">
            <h5 className="card-header bg-dark text-white">{review.title}</h5>
            <div className="card-body">
                <h5 className="card-title">
                    Rating:{' '}
                    <span className="text-success">{review.rating}</span>
                </h5>
                <p className="card-text">{review.description}</p>
                <p className="text-muted">Writtern By Kevin Smith</p>
            </div>
        </div>
    );
};

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
};

export default ReviewItem;
