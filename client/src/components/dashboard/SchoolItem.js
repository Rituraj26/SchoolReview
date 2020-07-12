import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SchoolItem = ({
    school: {
        _id,
        name,
        mainPhoto,
        averageRating,
        location: { formattedAddress },
    },
}) => {
    const history = useHistory();

    // Fixing of router inside router is needed
    const onClick = (schoolId) => {
        let path = `/schools/${schoolId}`;
        history.push(path);
    };

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={mainPhoto} className="card-img" alt="School" />
                </div>
                <div className="col-md-8">
                    <div className="card-body" onClick={() => onClick(_id)}>
                        <h5 className="card-title">
                            {name}
                            <span className="float-right badge badge-success">
                                {averageRating}
                            </span>
                        </h5>
                        <span className="badge badge-dark mb-2">
                            {formattedAddress}
                        </span>
                        {/* <p className="card-text">
                            Web Development, UI/UX, Mobile Development
                        </p> */}
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
