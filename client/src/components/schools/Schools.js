import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSchools } from '../../actions/schools';
import SchoolItem from './SchoolItem';
import SchoolByRadius from './SchoolByRadius';
import SchoolByRatingAndFounded from './SchoolByRatingAndFounded';
import Spinner from '../layout/Spinner';

const Schools = ({ getSchools, schools: { count, schoolData, loading } }) => {
    useEffect(() => {
        getSchools(1);
    }, [getSchools]);

    return (
        <section className="browse my-5 px-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <h4>Filter</h4>
                        <SchoolByRadius />
                        <SchoolByRatingAndFounded />
                    </div>

                    <div className="col-md-8">
                        {/* Show all Schools */}
                        {count > 0 || loading ? (
                            schoolData.map((sch) => (
                                <SchoolItem key={sch._id} school={sch} />
                            ))
                        ) : (
                            <Spinner />
                        )}

                        {/* <!-- Pagination --> */}
                        {/* <nav aria-label="Page navigation example">
                            <ul className="pagination">{paginationFun()}</ul>
                        </nav> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

Schools.propTypes = {
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        schools: state.schools,
    };
};

export default connect(mapStateToProps, { getSchools })(Schools);
