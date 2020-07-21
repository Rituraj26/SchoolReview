import React from 'react';
import SchoolByRadius from '../schools/SchoolByRadius';

const Landing = () => {
    return (
        <section className="showcase">
            <div className="dark-overlay">
                <div className="showcase-inner container">
                    <h1 className="display-4 mt-5">Find a School</h1>
                    <p className="lead my-3">
                        Find, rate and read reviews on Scholrify
                    </p>
                    <SchoolByRadius />
                </div>
            </div>
        </section>
    );
};

export default Landing;
