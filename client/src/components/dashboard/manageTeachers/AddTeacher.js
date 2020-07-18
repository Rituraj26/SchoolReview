import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addTeacher } from '../../../actions/teachers';

const initialState = {
    teacherName: '',
    photo: '',
    dept: '',
    exp: '',
    tutionAvailability: 'false',
    tutionFee: '',
    email: '',
    phoneNo: '',
    address: '',
};

const AddTeacher = ({ school, addTeacher }) => {
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);

    const {
        teacherName,
        photo,
        dept,
        exp,
        tutionAvailability,
        tutionFee,
        email,
        phoneNo,
        address,
    } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addTeacher(formData, school._id);
        history.push('/dashboard/teachers');
    };

    return (
        <section className="container mt-5">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <Link
                                to="/dashboard/teachers"
                                className="btn btn-link text-secondary my-3"
                            >
                                <i className="fas fa-chevron-left"></i> Manage
                                Teachers
                            </Link>
                            <h2 className="mb-2">{school.schoolName}</h2>
                            <h3 className="text-primary mb-4">Add Teacher</h3>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="teacherName"
                                        value={teacherName}
                                        className="form-control"
                                        placeholder="Name"
                                        onChange={(e) => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="teacherPhoto">Photo</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        name="photo"
                                        id="teacherPhoto"
                                        aria-describedby="fileHelp"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <select
                                        name="dept"
                                        value={dept}
                                        className="form-control"
                                        onChange={(e) => onChange(e)}
                                        required
                                    >
                                        <option value="">Any</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Science">Science</option>
                                        <option value="English">English</option>
                                        <option value="S Science">
                                            S Science
                                        </option>
                                        <option value="Computer">
                                            Computer
                                        </option>
                                        <option value="Physics">Physics</option>
                                        <option value="Chemistry">
                                            Chemistry
                                        </option>
                                        <option value="Biology">Biology</option>
                                        <option value="Physical Education">
                                            Physical Education
                                        </option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Experience</label>
                                    <input
                                        type="text"
                                        name="exp"
                                        value={exp}
                                        className="form-control"
                                        placeholder="Experience"
                                        onChange={(e) => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tution Availability</label>

                                    <div className="form-check my-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="tutionAvailability"
                                            value={false}
                                            id="no"
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="no"
                                        >
                                            No
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="tutionAvailability"
                                            value={true}
                                            id="yes"
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="yes"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                </div>

                                {tutionAvailability === 'true' ? (
                                    <div className="form-group">
                                        <label>Tution Fee</label>
                                        <input
                                            type="text"
                                            name="tutionFee"
                                            value={tutionFee}
                                            className="form-control"
                                            placeholder="Tution Fee"
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                ) : (
                                    <Fragment></Fragment>
                                )}
                                {/* Tution fee needs to be added */}
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        className="form-control"
                                        placeholder="Contact Email"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={phoneNo}
                                        className="form-control"
                                        placeholder="Phone"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={address}
                                        className="form-control"
                                        placeholder="Full Address"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <small className="form-text text-muted">
                                        Street, city, state, etc
                                    </small>
                                </div>

                                <div className="form-group mt-4">
                                    <input
                                        type="submit"
                                        value="Add Course"
                                        className="btn btn-dark btn-block"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

AddTeacher.propTypes = {
    addTeacher: PropTypes.func.isRequired,
    school: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        school: state.schools.school,
    };
};

export default connect(mapStateToProps, { addTeacher })(AddTeacher);