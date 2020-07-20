import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublisherSchool } from '../../../actions/schools';

import SchoolComponent from './SchoolComponent';
import NoSchoolComponent from './NoSchoolComponent';

const ManageSchool = ({ publisherSchool, getPublisherSchool }) => {
    useEffect(() => {
        getPublisherSchool(publisherSchool);
    }, [getPublisherSchool]);

    return (
        <section className="container mt-5 ml-5">
            <div className="row">
                <div className="col-md-10">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            {Object.keys(publisherSchool).length !== 0 ? (
                                <SchoolComponent
                                    school={publisherSchool.data}
                                />
                            ) : (
                                <NoSchoolComponent />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ManageSchool.propTypes = {
    getPublisherSchool: PropTypes.func.isRequired,
    publisherSchool: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const schools = state.schools;
    const user = state.auth.user;
    if (schools.count !== 0) {
        const school = schools.schoolData.filter(
            (school) => school.user === user._id
        );
        if (school.length) {
            return { publisherSchool: { data: school[0] } };
        }
    }
    return { publisherSchool: {} };
};

export default connect(mapStateToProps, { getPublisherSchool })(ManageSchool);
