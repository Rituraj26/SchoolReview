import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SchoolItem = ({
    school: {
        _id,
        schoolName,
        description,
        schoolPhoto,
        averageRating,
        location: { formattedAddress },
    },
}) => {
    return (
        <div className="card mb-3 mt-4">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        src={schoolPhoto.photoPath}
                        className="card-img"
                        alt={schoolPhoto.photoName}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`schools/${_id}`}>{schoolName}</Link>
                            <span className="float-right badge badge-success">
                                {averageRating}
                            </span>
                        </h5>

                        <p className="card-text">
                            {description.substring(0, 200) + '...'}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                {formattedAddress.substring(0, 60) + '...'}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

SchoolItem.propTypes = {
    school: PropTypes.object.isRequired,
};

export default SchoolItem;
