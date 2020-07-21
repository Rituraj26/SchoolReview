import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Sidebar = ({ user }) => {
    return (
        <div className="bg-light border-right shadow-sm " id="sidebar-wrapper">
            <div className="list-group list-group-flush">
                <Link
                    to="/dashboard/main"
                    className="list-group-item list-group-item-action bg-light py-4"
                >
                    <h5>Dashboard</h5>
                </Link>
                <Link
                    to="/dashboard/allschools"
                    className="list-group-item list-group-item-action bg-light"
                >
                    All Schools
                </Link>
                <Link
                    to="/dashboard/allteachers"
                    className="list-group-item list-group-item-action bg-light"
                >
                    All Teachers
                </Link>
                <Link
                    to="/dashboard/updatePersonalDetails"
                    className="list-group-item list-group-item-action bg-light"
                >
                    Update Personal Details
                </Link>
                <Link
                    to="/dashboard/updatePassword"
                    className="list-group-item list-group-item-action bg-light"
                >
                    Update Password
                </Link>

                {user &&
                (user.role === 'publisher' || user.role === 'admin') ? (
                    <Link
                        to="/dashboard/school"
                        className="list-group-item list-group-item-action bg-light"
                    >
                        Manage School
                    </Link>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(Sidebar);
