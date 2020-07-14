import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoutes = ({
    component: Component,
    auth: { isAuthenticated },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            !isAuthenticated ? (
                <Redirect to="/auth/login" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(PrivateRoutes);
