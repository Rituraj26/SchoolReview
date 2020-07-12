import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReview } from '../../actions/reviews';

const AddReview = ({ addReview }) => {
    const { schoolId } = useParams();

    const [formData, setFormData] = useState({
        rating: '8',
        title: '',
        description: '',
    });

    const { rating, title, description } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addReview({ rating, title, description }, schoolId);
    };

    return (
        <div className="card bg-white py-2 px-3">
            <div className="card-body">
                <h3 className="text-primary mb-4">Write a Review</h3>
                <p>
                    You must have attended and graduated this bootcamp to review
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="rating">
                            Rating:{' '}
                            <span className="text-primary">{rating}</span>
                        </label>
                        <input
                            type="range"
                            className="custom-range"
                            min="1"
                            max="10"
                            step="1"
                            name="rating"
                            value={rating}
                            onChange={(e) => onChange(e)}
                            id="rating"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Review title"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            rows="10"
                            name="description"
                            value={description}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Your review"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit Review"
                            className="btn btn-dark btn-block"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

AddReview.propTypes = {
    addReview: PropTypes.func.isRequired,
};

export default connect(null, { addReview })(AddReview);
