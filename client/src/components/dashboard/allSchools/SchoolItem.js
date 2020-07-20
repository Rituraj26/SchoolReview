import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SchoolItem = ({
    school: {
        _id,
        schoolName,
        description,
        schoolPhoto,
        averageRating,
        address,
    },
}) => {
    const history = useHistory();

    const onClick = (schoolId) => {
        history.push(`/schools/${schoolId}`);
    };

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
                    <div className="card-body d-flex flex-column justify-content-between">
                        <h5 className="card-title">
                            <span
                                className="schoolName"
                                onClick={() => onClick(_id)}
                            >
                                {schoolName}
                            </span>
                            <span className="float-right badge badge-success">
                                {averageRating}
                            </span>
                        </h5>

                        <p className="card-text my-4">
                            {description.substring(0, 200) + '...'}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                {address.substring(0, 60) + '...'}
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
