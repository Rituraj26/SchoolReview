import React from 'react';

const Landing = () => {
    return (
        <section class="showcase">
            <div class="dark-overlay">
                <div class="showcase-inner container">
                    <h1 class="display-4">Find a Code Bootcamp</h1>
                    <p class="lead">
                        Find, rate and read reviews on coding bootcamps
                    </p>
                    <form action="bootcamps.html">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="miles"
                                        placeholder="Miles From"
                                    />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="zipcode"
                                        placeholder="Enter Zipcode"
                                    />
                                </div>
                            </div>
                        </div>
                        <input
                            type="submit"
                            value="Find Bootcamps"
                            class="btn btn-primary btn-block"
                        />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Landing;
