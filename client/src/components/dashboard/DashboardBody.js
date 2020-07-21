import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSchools } from '../../actions/schools';

const DashboardBody = ({ getSchools, user }) => {
    useEffect(() => {
        getSchools(1);
    }, [getSchools]);

    return (
        <div className="container-fluid">
            <div className="row bg-white p-5">
                <div className="col-sm-12 col-md-12 well" id="content">
                    <h2>Welcome {user ? user.name : ''}</h2>
                </div>
            </div>

            <div className="row my-4">
                <div className="col-sm-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/dashboard/allSchools">
                                <h5 className="card-title">Get All Schools</h5>
                            </Link>
                            <p className="card-text">
                                Click here to see all the schools available in
                                this site
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/dashboard/allTeachers">
                                <h5 className="card-title">Get All Teachers</h5>
                            </Link>
                            <p className="card-text">
                                Click here to see all the teachers from
                                different schools
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/dashboard/updatePersonalDetails">
                                <h5 className="card-title">
                                    Update Personal Details
                                </h5>
                            </Link>
                            <p className="card-text">
                                Click here to update your personal details
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/dashboard/updatePassword">
                                <h5 className="card-title">Update Password</h5>
                            </Link>
                            <p className="card-text">
                                Click here to update your password
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DashboardBody.propTypes = {
    getSchools: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { getSchools })(DashboardBody);
