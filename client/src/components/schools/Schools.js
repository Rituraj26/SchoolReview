import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSchools, getSchoolByRadius } from '../../actions/schools';
import SchoolItem from './SchoolItem';
import SchoolByRadius from './SchoolByRadius';
import SchoolByRatingAndFounded from './SchoolByRatingAndFounded';

const Schools = ({
    getSchools,
    getSchoolByRadius,
    schools: { count, schoolData },
}) => {
    useEffect(() => {
        getSchools(1);
    }, [getSchools]);

    // Pagination Function
    // const paginationFun = () => {
    //     if (!pagination.next && !pagination.prev) {
    //         return <Fragment>oehafo</Fragment>;
    //     }
    //     if (pagination.next && pagination.prev) {
    //         return (
    //             <Fragment>
    //                 <li className="page-item">
    //                     <span
    //                         className="page-link"
    //                         onClick={() => getSchools(pagination.next.page - 1)}
    //                     >
    //                         Previous
    //                     </span>
    //                 </li>
    //                 <li className="page-item">
    //                     <span className="page-link">
    //                         {pagination.next.page - 1}
    //                     </span>
    //                 </li>
    //                 <li className="page-item">
    //                     <span
    //                         className="page-link"
    //                         onClick={() => getSchools(pagination.next.page)}
    //                     >
    //                         Next
    //                     </span>
    //                 </li>
    //             </Fragment>
    //         );
    //     } else if (pagination.next && !pagination.prev) {
    //         return (
    //             <Fragment>
    //                 <li className="page-item">
    //                     <span className="page-link">
    //                         {pagination.next.page - 1}
    //                     </span>
    //                 </li>
    //                 <li className="page-item">
    //                     <span
    //                         className="page-link"
    //                         onClick={() => getSchools(pagination.next.page)}
    //                     >
    //                         Next
    //                     </span>
    //                 </li>
    //             </Fragment>
    //         );
    //     } else {
    //         return (
    //             <Fragment>
    //                 <li className="page-item">
    //                     <span
    //                         className="page-link"
    //                         onClick={() => getSchools(pagination.prev.page)}
    //                     >
    //                         Previous
    //                     </span>
    //                 </li>
    //                 <li className="page-item">
    //                     <span className="page-link">
    //                         {pagination.prev.page + 1}
    //                     </span>
    //                 </li>
    //             </Fragment>
    //         );
    //     }
    // };

    return (
        <section className="browse my-5">
            <div className="container">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    <div className="col-md-4">
                        <h4>Filter</h4>
                        <SchoolByRadius />
                        <SchoolByRatingAndFounded />
                    </div>
                    {/* <!-- Main col --> */}
                    <div className="col-md-8">
                        {/* <!-- Bootcamps --> */}
                        {count > 0 ? (
                            schoolData.map((sch) => (
                                <SchoolItem key={sch._id} school={sch} />
                            ))
                        ) : (
                            <h1>No Schools Found</h1>
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

export default connect(mapStateToProps, { getSchools, getSchoolByRadius })(
    Schools
);
