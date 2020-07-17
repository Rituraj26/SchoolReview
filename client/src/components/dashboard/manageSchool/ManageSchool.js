import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublisherSchool } from '../../../actions/schools';

import SchoolComponent from './SchoolComponent';
import NoSchoolComponent from './NoSchoolComponent';

const ManageSchool = ({
    schools: { count, schoolData },
    user,
    getPublisherSchool,
    school,
}) => {
    useEffect(() => {
        if (count !== 0) {
            const school = schoolData.filter(
                (school) => school.user === user._id
            );
            if (school.length) {
                const schoolData = { data: school[0] };
                getPublisherSchool(schoolData);
            }
        }
    }, [getPublisherSchool]);

    return (
        <section className="container mt-5 ml-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            {Object.keys(school).length !== 0 ? (
                                <SchoolComponent school={school} />
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
    schools: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getPublisherSchool: PropTypes.func.isRequired,
    school: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        schools: state.schools,
        user: state.auth.user,
        getPublisherSchool,
        school: state.schools.school,
    };
};

export default connect(mapStateToProps, { getPublisherSchool })(ManageSchool);
