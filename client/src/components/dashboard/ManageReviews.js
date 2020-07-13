import React from 'react';
import PropTypes from 'prop-types';

const ManageReviews = (props) => {
    return (
        <section class="container mt-5 ml-5">
            <div class="row">
                <div class="col-md-10">
                    <div class="card bg-white py-2 px-4">
                        <div class="card-body">
                            <h1 class="mb-4">Manage Reviews</h1>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Bootcamp</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DevWorks Bootcamp</td>
                                        <td>10</td>
                                        <td>
                                            <a
                                                href="add-review.html"
                                                class="btn btn-secondary"
                                            >
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <button class="btn btn-danger">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Codemasters</td>
                                        <td>7</td>
                                        <td>
                                            <a
                                                href="add-review.html"
                                                class="btn btn-secondary"
                                            >
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <button class="btn btn-danger">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ManageReviews.propTypes = {};

export default ManageReviews;
