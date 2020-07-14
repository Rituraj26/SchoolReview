import React from 'react';

const NoSchoolComponent = () => {
    return (
        <section class="container mt-5 ml-5">
            <div class="row">
                <div class="col-md-8">
                    <div class="card bg-white py-2 px-4">
                        <div class="card-body">
                            <h1 class="mb-2">Manage Bootcamp</h1>
                            <p class="lead">
                                You have not yet added a bootcamp
                            </p>
                            <a
                                href="add-bootcamp.html"
                                class="btn btn-primary btn-block"
                            >
                                Add Bootcamp
                            </a>
                            <p class="text-muted mt-5">
                                * You can only add one bootcamp per account.
                            </p>
                            <p class="text-muted">
                                * You must be affiliated with the bootcamp in
                                some way in order to add it to DevCamper.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoSchoolComponent;
