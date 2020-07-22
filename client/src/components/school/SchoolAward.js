import React from 'react';
import PropTypes from 'prop-types';

const SchoolAward = ({ award }) => {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div className="card p-1">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>
                                <h6>Name</h6>
                            </td>
                            <td>{award.awardTitle}</td>
                        </tr>
                        <tr>
                            <td>
                                <h6>Percentage</h6>
                            </td>
                            <td>{award.awardYear}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

SchoolAward.propTypes = {
    award: PropTypes.object.isRequired,
};

export default SchoolAward;
