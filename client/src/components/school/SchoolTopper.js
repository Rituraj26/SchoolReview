import React from 'react';
import PropTypes from 'prop-types';

const SchoolTopper = ({ topper }) => {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div className="card p-1">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>
                                <h6>Name</h6>
                            </td>
                            <td>{topper.topperName}</td>
                        </tr>
                        <tr>
                            <td>
                                <h6>Percentage</h6>
                            </td>
                            <td>{topper.topperPercentage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

SchoolTopper.propTypes = {
    topper: PropTypes.object.isRequired,
};

export default SchoolTopper;
