import React from 'react';
import { Route } from 'react-router-dom';

// Importing Components
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AllSchools from './allSchools/AllSchools';
import AllTeachers from './allTeachers/AllTeachers';
import ManageAccount from './manageAccount/ManageAccount';
import ManageSchool from './manageSchool/ManageSchool'; // Update is required
import ManageTeachers from './ManageTeachers';
import ManageReviews from './ManageReviews';

const Dashboard = () => {
    return (
        <div className="d-flex" id="wrapper">
            <Sidebar />

            <div id="page-content-wrapper">
                <Navbar />

                <Route path="/dashboard/allschools" component={AllSchools} />
                <Route path="/dashboard/allteachers" component={AllTeachers} />
                <Route path="/dashboard/account" component={ManageAccount} />
                <Route path="/dashboard/school" component={ManageSchool} />
                <Route path="/dashboard/teachers" component={ManageTeachers} />
                <Route path="/dashboard/reviews" component={ManageReviews} />
            </div>
        </div>
    );
};

export default Dashboard;
