import React from 'react';
import SchoolByRadius from '../schools/SchoolByRadius';

const Landing = () => {
    return (
        <section class="showcase">
            <div class="dark-overlay">
                <div class="showcase-inner container">
                    <h1 class="display-4 mt-5">Find a School</h1>
                    <p class="lead my-3">
                        Find, rate and read reviews on Scholrify
                    </p>
                    <SchoolByRadius />
                </div>
            </div>
        </section>
    );
};

export default Landing;
