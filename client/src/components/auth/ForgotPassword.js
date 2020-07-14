import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ forgotPassword }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        forgotPassword({ email });
        history.push('/auth/login');
    };

    return (
        <section className="mt-5 ml-5">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <Link to="/auth/login">Back to login</Link>
                            <h1 className="mb-2">Reset Password</h1>
                            <p>
                                Use this form to reset your password using the
                                registered email address.
                            </p>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Enter Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        className="form-control"
                                        placeholder="Email address"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Reset Password"
                                        className="btn btn-dark btn-block"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, { forgotPassword })(ForgotPassword);
