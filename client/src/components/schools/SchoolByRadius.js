import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSchoolByRadius } from '../../actions/schools';

const SchoolByRadius = ({ getSchoolByRadius }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        zipcode: '',
        distance: '',
    });

    const { zipcode, distance } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getSchoolByRadius({ zipcode, distance }, history);
        setFormData({
            zipcode: '',
            distance: '',
        });
    };

    return (
        <div className="card card-body mb-4">
            <h4 className="mb-3">By Location</h4>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="distance"
                                value={distance}
                                placeholder="Kms From"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="zipcode"
                                value={zipcode}
                                placeholder="Enter Zipcode"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Find Schools"
                    className="btn btn-primary btn-block"
                />
            </form>
        </div>
    );
};

SchoolByRadius.propTypes = {
    getSchoolByRadius: PropTypes.func.isRequired,
};

export default connect(null, { getSchoolByRadius })(SchoolByRadius);
