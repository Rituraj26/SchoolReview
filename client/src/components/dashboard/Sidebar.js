import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-light border-right shadow-sm " id="sidebar-wrapper">
            <div className="sidebar-heading">Dashboard</div>
            <div className="list-group list-group-flush">
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
                <Link
                    to="/dashboard/school"
                    className="list-group-item list-group-item-action bg-light"
                >
                    Manage School
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
