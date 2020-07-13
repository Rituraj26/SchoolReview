import React from 'react';

const TeacherItem = ({ teacher: { name, dept, exp } }) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 mt-5">
            <div className="card">
                <div className="card-body text-center">
                    <p>
                        <img
                            className=" img-fluid"
                            src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"
                            alt="teacher"
                        />
                    </p>
                    <h4 className="card-title">Name: {name}</h4>
                    <h4 className="card-title">Dept: {dept}</h4>
                    <h4 className="card-title">Experience: {exp}</h4>
                    <p className="card-text">
                        This is basic card with image on top, title, description
                        and button.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherItem;
