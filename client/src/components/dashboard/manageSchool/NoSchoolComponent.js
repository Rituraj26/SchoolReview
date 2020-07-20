import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NoSchoolComponent = () => {
    return (
        <Fragment>
            <h1 className="mb-2">Manage School</h1>
            <p className="lead">You have not yet added a school</p>
            <Link
                to="/dashboard/school/add"
                className="btn btn-primary btn-block"
            >
                Add School
            </Link>
            <p className="text-muted mt-5">
                * You can only add one school per account.
            </p>
            <p className="text-muted">
                * You must be affiliated with the school in some way in order to
                add it to Schoorify.
            </p>
        </Fragment>
    );
};

export default NoSchoolComponent;
