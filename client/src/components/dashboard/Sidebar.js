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
                    to="/dashboard/account"
                    className="list-group-item list-group-item-action bg-light"
                >
                    Manage Account
                </Link>
                <Link
                    to="/dashboard/school"
                    className="list-group-item list-group-item-action bg-light"
                >
                    Manage School
                </Link>
                <Link
                    to="/dashboard/reviews"
                    className="list-group-item list-group-item-action bg-light"
                >
                    Manage Reviews
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
