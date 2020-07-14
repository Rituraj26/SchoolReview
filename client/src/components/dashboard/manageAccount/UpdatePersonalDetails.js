import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updatePersonalDetails } from '../../../actions/dashboard';

const UpdatePersonalDetails = ({ updatePersonalDetails, user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
    });

    const { name, email } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updatePersonalDetails({ name, email });
    };

    return (
        <section className="mt-5 ml-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <h1 className="mb-2">Manage Account</h1>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        className="form-control"
                                        placeholder="Name"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                type="submit"
                                                value="Save"
                                                className="btn btn-success btn-block"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

UpdatePersonalDetails.propTypes = {
    updatePersonalDetails: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { updatePersonalDetails })(
    UpdatePersonalDetails
);
