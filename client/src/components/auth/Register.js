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
        return <Redirect to="/schools" />;
    }

    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => onChange(e)}
                />
                <select value={role} name="role" onChange={(e) => onChange(e)}>
                    <option value="user">User</option>
                    <option value="teacher">Teacher</option>
                    <option value="publisher">Publisher</option>
                </select>

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
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/auth/login">Login</Link>
            </p>
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
