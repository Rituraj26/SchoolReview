import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const SchoolComponent = ({
    school: {
        _id,
        name,
        averageRating,
        location: { formattedAddress },
    },
}) => {
    return (
        <section className="container mt-5 ml-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
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
                                                <Link to={`/schools/${_id}`}>
                                                    {name}
                                                    <span className="float-right badge badge-success">
                                                        {averageRating}
                                                    </span>
                                                </Link>
                                            </h5>
                                            <span className="badge badge-dark mb-2">
                                                {formattedAddress}
                                            </span>
                                            <p className="card-text">
                                                Web Development, UI/UX, Mobile
                                                Development
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className="mb-4">
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="photo"
                                            className="custom-file-input"
                                            id="photo"
                                        />
                                        <label
                                            className="custom-file-label"
                                            for="photo"
                                        >
                                            Add Bootcamp Image
                                        </label>
                                    </div>
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
                                * You can only add one bootcamp per account.
                            </p>
                            <p className="text-muted">
                                * You must be affiliated with the bootcamp in
                                some way in order to add it to DevCamper.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

SchoolComponent.propTypes = {
    school: PropTypes.object.isRequired,
};

export default SchoolComponent;
