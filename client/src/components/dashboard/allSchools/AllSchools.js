import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SchoolItem from './SchoolItem';
import Spinner from '../../layout/Spinner';

const AllSchools = ({ schools: { count, schoolData, loading } }) => {
    return (
        <section className="browse my-5 px-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {count > 0 ? (
                            schoolData.map((sch) => (
                                <SchoolItem key={sch._id} school={sch} />
                            ))
                        ) : count > 0 ? (
                            <Spinner />
                        ) : (
                            <h2>No Schools Found</h2>
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

AllSchools.propTypes = {
    schools: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        schools: state.schools,
    };
};

export default connect(mapStateToProps)(AllSchools);
