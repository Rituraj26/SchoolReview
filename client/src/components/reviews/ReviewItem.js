import React from 'react';
import PropTypes from 'prop-types';

const ReviewItem = ({ review }) => {
    return (
        <div class="card mb-3">
            <h5 class="card-header bg-dark text-white">{review.title}</h5>
            <div class="card-body">
                <h5 class="card-title">
                    Rating: <span class="text-success">{review.rating}</span>
                </h5>
                <p class="card-text">{review.description}</p>
                <p class="text-muted">Writtern By Kevin Smith</p>
            </div>
        </div>
    );
};

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
};

export default ReviewItem;
