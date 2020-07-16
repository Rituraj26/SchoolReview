import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchools } from '../../../actions/schools';

import SchoolComponent from './SchoolComponent';
import NoSchoolComponent from './NoSchoolComponent';

const ManageSchool = ({ getSchools, schools: { count, schoolData }, user }) => {
    useEffect(() => {
        getSchools();
    }, []);

    const findSchool = () => {
        if (count !== 0) {
            const school = schoolData.filter(
                (school) => school.user === user._id
            );
            if (school.length) {
                return <SchoolComponent school={school[0]} />;
            }
            return <NoSchoolComponent />;
        }
        return <div>No School Available</div>;
    };

    return (
        <section className="container mt-5 ml-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">{findSchool()}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ManageSchool.propTypes = {
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        schools: state.schools,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { getSchools })(ManageSchool);
