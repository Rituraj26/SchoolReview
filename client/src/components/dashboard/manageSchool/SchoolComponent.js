import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { schoolPhotoUpload, deleteSchool } from '../../../actions/schools';

const SchoolComponent = ({ school, deleteSchool, schoolPhotoUpload }) => {
    const [file, setFile] = useState('');

    const history = useHistory();

    const onClick = (schoolId) => {
        history.push(`/schools/${schoolId}`);
    };

    const onPhotoUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);

        schoolPhotoUpload(school._id, data);
    };

    return (
        <Fragment>
            <h1 className="mb-4">Manage School</h1>
            <div className="card mb-3 mt-4">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img
                            src={school.schoolPhoto.photoPath}
                            className="card-img"
                            alt={school.schoolPhoto.photoName}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title">
                                <span
                                    className="pointer"
                                    onClick={() => onClick(school._id)}
                                >
                                    {school.schoolName}
                                </span>
                                <span className="float-right badge badge-success">
                                    {school.averageRating}
                                </span>
                            </h5>

                            <p className="card-text">
                                {school.description.substring(0, 160) + '...'}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {school.address.substring(0, 60) + '...'}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <form className="mb-4" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="photo">Add School Image</label>
                    <input
                        type="file"
                        className="form-control-file"
                        name="file"
                        id="photo"
                        aria-describedby="fileHelp"
                        onChange={(e) => onPhotoUpload(e)}
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
            <button
                onClick={() => deleteSchool(school._id)}
                className="btn btn-danger btn-block"
            >
                Remove School
            </button>
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
    deleteSchool: PropTypes.func.isRequired,
    schoolPhotoUpload: PropTypes.func.isRequired,
};

export default connect(null, { deleteSchool, schoolPhotoUpload })(
    SchoolComponent
);
