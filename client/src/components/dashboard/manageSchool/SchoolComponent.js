import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SchoolComponent = ({ school }) => {
    return (
        <Fragment>
            <h1 className="mb-4">Manage School</h1>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img
                            src="img/image_1.jpg"
                            className="card-img"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/schools/${school._id}`}>
                                    {school.schoolName}
                                    <span className="float-right badge badge-success">
                                        {school.averageRating}
                                    </span>
                                </Link>
                            </h5>
                            <span className="badge badge-dark mb-2">
                                {school.address.substring(0, 35) + '...'}
                            </span>
                            <p className="card-text">
                                Web Development, UI/UX, Mobile Development
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <form className="mb-4">
                <div className="form-group">
                    <label htmlFor="photo">Add School Image</label>
                    <input
                        type="file"
                        className="form-control-file"
                        name="file"
                        id="photo"
                        aria-describedby="fileHelp"
                        // onChange={(e) => onPhotoUpload(e)}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-light btn-block"
                    value="Upload Image"
                />
            </form>
            <Link
                to="/dashboard/school/edit"
                className="btn btn-primary btn-block"
            >
                Edit School Details
            </Link>
            <Link
                to="/dashboard/teachers"
                className="btn btn-secondary btn-block"
            >
                Manage Teachers
            </Link>
            <Link to="#" className="btn btn-danger btn-block">
                Remove School
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

SchoolComponent.propTypes = {
    school: PropTypes.object.isRequired,
};

export default SchoolComponent;
