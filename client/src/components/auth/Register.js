import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { register } from '../../actions/auth';

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        password: '',
    });

    const { name, email, role, password } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register({ name, email, role, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
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
                                        <i className="fas fa-user-plus"></i>{' '}
                                        Register
                                    </h1>
                                    <p>
                                        Register to list your bootcamp or rate,
                                        review and favorite bootcamps
                                    </p>
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={name}
                                                className="form-control"
                                                placeholder="Enter full name"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                className="form-control"
                                                placeholder="Enter email"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                className="form-control"
                                                placeholder="Enter password"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>

                                        <div className="card card-body mb-3">
                                            <h5>User Role</h5>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="user"
                                                    name="role"
                                                    value="user"
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                    checked
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="user"
                                                >
                                                    Regular User (Browse, Write
                                                    reviews, etc)
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="teacher"
                                                    name="role"
                                                    value="teacher"
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="teacher"
                                                >
                                                    School Teacher
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="publisher"
                                                    name="role"
                                                    value="publisher"
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="publisher"
                                                >
                                                    School Publisher
                                                </label>
                                            </div>
                                        </div>
                                        <p className="text-danger">
                                            * You must be affiliated with the
                                            bootcamp in some way in order to add
                                            it to DevCamper.
                                        </p>
                                        <div className="form-group">
                                            <input
                                                type="submit"
                                                value="Register"
                                                className="btn btn-primary btn-block"
                                            />
                                        </div>
                                    </form>
                                    <p className="my-1">
                                        Already have an account?{' '}
                                        <Link to="/auth/login">Login</Link>
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

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { register })(Register);
