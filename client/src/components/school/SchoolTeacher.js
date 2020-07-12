import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SchoolTeacher = ({ teacher }) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-3">
            <Link to="https://google.com">
                <div className="card">
                    <div className="card-body text-center">
                        <p>
                            <img
                                className=" img-fluid"
                                src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"
                                alt="teacher"
                            />
                        </p>
                        <h4 className="card-title"></h4>
                        <p className="card-text">
                            This is basic card with image on top, title,
                            description and button.
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

SchoolTeacher.propTypes = {
    teacher: PropTypes.object.isRequired,
};

export default SchoolTeacher;
