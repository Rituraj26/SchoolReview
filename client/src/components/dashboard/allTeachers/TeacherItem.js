import React from 'react';

const TeacherItem = ({ teacher: { teacherName, dept, exp } }) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 mt-5">
            <div className="card">
                <div className="card-body">
                    <p className="text-center">
                        <img
                            className=" img-fluid"
                            src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"
                            alt="teacher"
                        />
                    </p>

                    <table className="table table-borderless ">
                        <tbody>
                            <tr>
                                <td>Name :</td>
                                <td>{teacherName}</td>
                            </tr>
                            <tr>
                                <td>Department :</td>
                                <td>{dept}</td>
                            </tr>
                            <tr>
                                <td>Experience :</td>
                                <td>{exp}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="card-text text-center">
                        This is basic card with image on top, title, description
                        and button.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherItem;
