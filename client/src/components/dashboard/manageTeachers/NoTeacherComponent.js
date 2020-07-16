import React from 'react';

const NoTeacherComponent = () => {
    return (
        <section class="container mt-5">
            <div class="row">
                <div class="col-md-8 m-auto">
                    <div class="card bg-white py-2 px-4">
                        <div class="card-body">
                            <h1 class="mb-2">Manage Courses</h1>
                            <p class="lead">
                                You have not yet added any courses
                            </p>
                            <a
                                href="add-course.html"
                                class="btn btn-primary btn-block"
                            >
                                Add Your first course
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoTeacherComponent;
