import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchoolByRatingAndFounded } from '../../actions/schools';

const SchoolByRatingAndFounded = ({ getSchoolByRatingAndFounded }) => {
    const [formData, setFormData] = useState({
        rating: '',
        founded: '',
    });

    const { rating, founded } = formData;

    // Get Schools By Rating and Founded date Form Handler

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getSchoolByRatingAndFounded({ rating, founded });
    };

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
                <label> Rating</label>
                <select
                    className="custom-select mb-2"
                    name="rating"
                    onChange={(e) => onChange(e)}
                >
                    <option value="any">Any</option>
                    <option value="9">9+</option>
                    <option value="8">8+</option>
                    <option value="7">7+</option>
                    <option value="6">6+</option>
                    <option value="5">5+</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                    <option value="2">2+</option>
                </select>
            </div>

            <div className="form-group">
                <label> Founded</label>
                <select
                    className="custom-select mb-2"
                    name="founded"
                    onChange={(e) => onChange(e)}
                >
                    <option value="any">Any</option>
                    <option value="2010">2010+</option>
                    <option value="2000">2000+</option>
                    <option value="1990">1990+</option>
                    <option value="1980">1980+</option>
                </select>
            </div>
            <input
                type="submit"
                value="Find Schools"
                className="btn btn-primary btn-block"
            />
        </form>
    );
};

SchoolByRatingAndFounded.propTypes = {
    getSchoolByRatingAndFounded: PropTypes.func.isRequired,
};

export default connect(null, { getSchoolByRatingAndFounded })(
    SchoolByRatingAndFounded
);
