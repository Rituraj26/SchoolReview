import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
    return (
        alerts !== null &&
        alerts.length >= 0 &&
        alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                {alert.msg}
            </div>
        ))
    );
};

Alert.propTypes = {
    alerts: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.Alert,
});

export default connect(mapStateToProps)(Alert);
