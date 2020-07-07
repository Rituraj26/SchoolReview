import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

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
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/auth/register">Sign In</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { login })(Login);
