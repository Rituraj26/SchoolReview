import React from 'react';
import PropTypes from 'prop-types';

const SchoolTopper = ({ topper }) => {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div className="card">
                <div className="card-body text-center">
                    <p>
                        <img
                            className=" img-fluid"
                            src={`http://placehold.it/500x300`}
                            alt="topper"
                        />
                    </p>
                    <h4 className="card-title">
                        Topper Name {Math.floor(Math.random() * 10)}
                    </h4>
                </div>
            </div>
        </div>
    );
};

SchoolTopper.propTypes = {
    topper: PropTypes.object.isRequired,
};

export default SchoolTopper;
