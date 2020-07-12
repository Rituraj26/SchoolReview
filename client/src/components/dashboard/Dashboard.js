import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing Components
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AllSchools from './AllSchools';
import AllTeachers from './AllTeachers';
import ManageAccount from './manageAccount/ManageAccount';
import ManageSchool from './manageSchool/ManageSchool'; // Update is required
import ManageTeachers from './ManageTeachers';
import ManageReviews from './ManageReviews';

const Dashboard = () => {
    return (
        <Router>
            <div className="d-flex" id="wrapper">
                <Sidebar />

                <div id="page-content-wrapper">
                    <Navbar />

                    <Switch>
                        <Route
                            exact
                            path="/dashboard/allschools"
                            component={AllSchools}
                        />
                        <Route
                            exact
                            path="/dashboard/allteachers"
                            component={AllTeachers}
                        />
                        <Route
                            exact
                            path="/dashboard/account"
                            component={ManageAccount}
                        />
                        <Route
                            exact
                            path="/dashboard/school"
                            component={ManageSchool}
                        />
                        <Route
                            exact
                            path="/dashboard/teachers"
                            component={ManageTeachers}
                        />
                        <Route
                            exact
                            path="/dashboard/reviews"
                            component={ManageReviews}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
