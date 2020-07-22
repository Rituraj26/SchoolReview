import React from 'react';
import { Route } from 'react-router-dom';

// Importing Components
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardBody from './DashboardBody';
import AllSchools from './allSchools/AllSchools';
import AllTeachers from './allTeachers/AllTeachers';
import UpdatePersonalDetails from './updatePersonalDetails/UpdatePersonalDetails';
import UpdatePassword from './updatePassword/UpdatePassword';
import ManageSchool from './manageSchool/ManageSchool';
import AddSchool from './manageSchool/AddSchool';
import EditSchool from './manageSchool/EditSchool';
import ManageTeachers from './manageTeachers/ManageTeachers';
import AddTeacher from './manageTeachers/AddTeacher';
import EditTeacher from './manageTeachers/EditTeacher';

const Dashboard = () => {
    return (
        <div className="d-flex" id="wrapper">
            <Sidebar />

            <div id="page-content-wrapper">
                <Navbar />

                <Route path="/dashboard/main" component={DashboardBody} />
                <Route path="/dashboard/allschools" component={AllSchools} />
                <Route path="/dashboard/allteachers" component={AllTeachers} />
                <Route
                    path="/dashboard/updatePersonalDetails"
                    component={UpdatePersonalDetails}
                />
                <Route
                    path="/dashboard/updatePassword"
                    component={UpdatePassword}
                />
                <Route
                    exact
                    path="/dashboard/school"
                    component={ManageSchool}
                />
                <Route path="/dashboard/school/add" component={AddSchool} />
                <Route path="/dashboard/school/edit" component={EditSchool} />
                <Route
                    exact
                    path="/dashboard/teachers"
                    component={ManageTeachers}
                />
                <Route path="/dashboard/teachers/add" component={AddTeacher} />
                <Route
                    path="/dashboard/teachers/edit/:teacherId"
                    component={EditTeacher}
                />
            </div>
        </div>
    );
};

export default Dashboard;
