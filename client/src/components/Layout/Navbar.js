import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const history = useHistory();

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/schools">
                    Browse Schools
                </Link>
            </li>
            <li className="nav-item d-none d-sm-block">
                <a className="nav-link" href="#!">
                    |
                </a>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/main">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item d-none d-sm-block">
                <a className="nav-link" href="#!">
                    |
                </a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="#!"
                    onClick={() => logout(history)}
                >
                    <i className="fas fa-sign-out-alt"></i> Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/auth/login">
                    <i className="fas fa-sign-in-alt"></i> Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/auth/register">
                    <i className="fas fa-user-plus"></i> Register
                </Link>
            </li>
            <li className="nav-item d-none d-sm-block">
                <a className="nav-link" href="#!">
                    |
                </a>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/schools">
                    Browse Bootcamps
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container-fluid mx-5">
                <Link className="navbar-brand" to="/">
                    <i className="fas fa-laptop-code"></i> Schoolrify
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {
                        <Fragment>
                            {' '}
                            {isAuthenticated ? authLinks : guestLinks}
                        </Fragment>
                    }
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
