import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/schools" />;
    }

    return (
        <Fragment>
            <section className="form mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="card bg-white p-4 mb-4">
                                <div className="card-body">
                                    <h1>
                                        <i className="fas fa-sign-in-alt"></i>{' '}
                                        Login
                                    </h1>
                                    <p>
                                        Log in to list your bootcamp or rate,
                                        review and favorite bootcamps
                                    </p>
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                name="email"
                                                value={email}
                                                required
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                className="form-control"
                                                placeholder="Enter password"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="submit"
                                                value="Login"
                                                className="btn btn-primary btn-block"
                                            />
                                        </div>
                                    </form>
                                    <p>
                                        {' '}
                                        Forgot Password?{' '}
                                        <a href="reset-password.html">
                                            Reset Password
                                        </a>
                                    </p>
                                    <p>
                                        Don't have an account?{' '}
                                        <Link to="/auth/register">Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { login })(Login);
