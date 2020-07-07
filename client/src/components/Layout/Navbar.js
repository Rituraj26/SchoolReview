import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <span>
            <a href="#!" onClick={logout}>
                Logout
            </a>
        </span>
    );

    const guestLinks = (
        <span>
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/register">Sign In</Link>
        </span>
    );

    return (
        <nav>
            <Link to="/">DevConnector</Link>

            {!loading && (
                <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
