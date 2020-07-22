import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { editSchool } from '../../../actions/schools';

const EditSchool = ({ editSchool, school }) => {
    const history = useHistory();

    const [tempData, setTempData] = useState({
        topperName: '',
        topperPercentage: '',
        awardTitle: '',
        awardYear: '',
    });

    const { topperName, topperPercentage, awardTitle, awardYear } = tempData;

    const initialState = {
        schoolName: school.schoolName,
        description: school.description,
        address: school.address,
        email: school.contactUs.email,
        website: school.contactUs.website,
        phoneNo: school.contactUs.phoneNo,
        founded: school.founded,
        admissionFee: school.feeStructure.admissionFee,
        tutionFee: school.feeStructure.tutionFee,
        busFee: school.feeStructure.busFee,
        hostelFee: school.feeStructure.hostelFee,
        scholarshipAvailable: school.scholarshipAvailable.toString(),
        toppers: school.toppers,
        awards: school.awards,
    };

    const [formData, setFormData] = useState(initialState);

    const {
        schoolName,
        description,
        address,
        phoneNo,
        email,
        website,
        founded,
        admissionFee,
        tutionFee,
        busFee,
        hostelFee,
        scholarshipAvailable,
        toppers,
        awards,
    } = formData;

    const onTempChange = (e) => {
        setTempData({
            ...tempData,
            [e.target.name]: e.target.value,
        });
    };

    const onTempBtnClick = (e) => {
        if (e.target.id === 'topper' && toppers.length < 4) {
            toppers.push({
                topperName,
                topperPercentage,
            });
            setTempData({
                ...tempData,
                topperName: '',
                topperPercentage: '',
            });
        } else if (e.target.id === 'award' && awards.length < 4) {
            awards.push({
                awardTitle,
                awardYear,
            });
            setTempData({
                ...tempData,
                awardTitle: '',
                awardYear: '',
            });
        }
    };

    const deleteTemp = (tempId, type) => {
        if (type === 'topper') {
            setFormData({
                ...formData,
                toppers: toppers.filter((topper) => topper._id !== tempId),
            });
        } else if (type === 'award') {
            setFormData({
                ...formData,
                awards: awards.filter((award) => award._id !== tempId),
            });
        }
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editSchool(formData, school._id, history);
    };

    return (
        <section className="container mt-5">
            <h1 className="mb-4">Edit School Details</h1>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    {/* Location & Contact Details */}

                    <div className="col-md-6">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h3>Location & Contact</h3>
                                <p className="text-muted">
                                    If multiple locations, use the main or
                                    largest
                                </p>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="schoolName"
                                        value={schoolName}
                                        className="form-control"
                                        placeholder="Bootcamp Name"
                                        onChange={(e) => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={description}
                                        rows="5"
                                        className="form-control"
                                        placeholder="Description (What you offer, etc)"
                                        onChange={(e) => onChange(e)}
                                        maxLength="500"
                                    ></textarea>
                                    <small className="form-text text-muted">
                                        Not more than 500 characters
                                    </small>
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
                                        required
                                    />
                                    <small className="form-text text-muted">
                                        Street, city, state, etc
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={phoneNo}
                                        className="form-control"
                                        onChange={(e) => onChange(e)}
                                        placeholder="Phone"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        className="form-control"
                                        onChange={(e) => onChange(e)}
                                        placeholder="Contact Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={website}
                                        className="form-control"
                                        onChange={(e) => onChange(e)}
                                        placeholder="Website URL"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Info */}

                    <div className="col-md-6">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h3>Other Info</h3>

                                <div className="form-group">
                                    <label>Founded</label>
                                    <input
                                        type="text"
                                        name="founded"
                                        value={founded}
                                        className="form-control"
                                        placeholder="Founded Year"
                                        onChange={(e) => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fee Structure</label>
                                    <input
                                        type="text"
                                        name="admissionFee"
                                        value={admissionFee}
                                        className="form-control mb-3"
                                        placeholder="Admission Fee (in rs)"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <input
                                        type="text"
                                        name="tutionFee"
                                        value={tutionFee}
                                        className="form-control mb-3"
                                        placeholder="Tution Fee (in rs)"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <input
                                        type="text"
                                        name="busFee"
                                        value={busFee}
                                        className="form-control mb-3"
                                        placeholder="Bus Fee (in rs)"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <input
                                        type="text"
                                        name="hostelFee"
                                        value={hostelFee}
                                        className="form-control mb-3"
                                        placeholder="Hostel Fee (in rs)"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Scholarship Availibility</label>
                                    <div className="form-check my-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="scholarshipAvailable"
                                            value={'false'}
                                            id="no"
                                            onChange={(e) => onChange(e)}
                                            checked={
                                                scholarshipAvailable === 'false'
                                            }
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
                                            name="scholarshipAvailable"
                                            value={'true'}
                                            id="yes"
                                            onChange={(e) => onChange(e)}
                                            checked={
                                                scholarshipAvailable === 'true'
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="yes"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                </div>

                                <p className="text-muted my-4">
                                    *After you add the school, you can add the
                                    teachers details in your school
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Topper Section */}

                <div className="row">
                    <div className="col-md-12 mt-5">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body row">
                                <div className="col-md-6">
                                    <h3>Add Toppers</h3>
                                    <p className="text-muted">
                                        *You can only add maximum of 4 toppers
                                    </p>

                                    <div className="form-group">
                                        <label>Topper Name</label>
                                        <input
                                            type="text"
                                            name="topperName"
                                            value={topperName}
                                            className="form-control"
                                            placeholder="Topper Name"
                                            onChange={(e) => onTempChange(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Percentage</label>
                                        <input
                                            type="text"
                                            name="topperPercentage"
                                            value={topperPercentage}
                                            className="form-control"
                                            placeholder="Percentage"
                                            onChange={(e) => onTempChange(e)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        id="topper"
                                        class="btn btn-secondary my-2"
                                        onClick={(e) => onTempBtnClick(e)}
                                    >
                                        Add Topper
                                    </button>
                                </div>

                                <div className="col-md-6">
                                    <div className="row ml-5">
                                        {toppers.length ? (
                                            toppers.map((topper) => (
                                                <div
                                                    key={topper._id}
                                                    className="col-md-5"
                                                >
                                                    <div className="card">
                                                        <div className="card-body p-1">
                                                            <table className="table table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            {
                                                                                topper.topperName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className="close pointer"
                                                                                onClick={() =>
                                                                                    deleteTemp(
                                                                                        topper._id,
                                                                                        'topper'
                                                                                    )
                                                                                }
                                                                            >
                                                                                &times;
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {
                                                                                topper.topperPercentage
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <Fragment>
                                                No Toppers Data Available
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Awards Section */}

                <div className="row">
                    <div className="col-md-12 mt-5">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body row">
                                <div className="col-md-6">
                                    <h3>Add Awards</h3>
                                    <p className="text-muted">
                                        *You can only add maximum of 4 awards
                                    </p>

                                    <div class="form-group">
                                        <label htmlFor="awardTitle">
                                            Award Title
                                        </label>
                                        <input
                                            type="text"
                                            name="awardTitle"
                                            value={awardTitle}
                                            id="awardTitle"
                                            className="form-control"
                                            placeholder="Award Title"
                                            onChange={(e) => onTempChange(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="awardYear">
                                            Award Year
                                        </label>
                                        <input
                                            type="text"
                                            name="awardYear"
                                            value={awardYear}
                                            id="awardYear"
                                            className="form-control"
                                            placeholder="Award Year"
                                            onChange={(e) => onTempChange(e)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        class="btn btn-secondary my-2"
                                        id="award"
                                        onClick={(e) => onTempBtnClick(e)}
                                    >
                                        Add Awards
                                    </button>
                                </div>

                                <div className="col-md-6">
                                    <div className="row ml-5">
                                        {awards.length ? (
                                            awards.map((award) => (
                                                <div
                                                    key={award._id}
                                                    className="col-md-5"
                                                >
                                                    <div className="card">
                                                        <div className="card-body p-1">
                                                            <table className="table table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            {
                                                                                award.awardTitle
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className="close pointer"
                                                                                onClick={() =>
                                                                                    deleteTemp(
                                                                                        award._id,
                                                                                        'award'
                                                                                    )
                                                                                }
                                                                            >
                                                                                &times;
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {
                                                                                award.awardYear
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <Fragment>
                                                No Awards Data Available
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Submit Bootcamp"
                        className="btn btn-success btn-block my-4"
                    />
                </div>
            </form>
        </section>
    );
};

EditSchool.propTypes = {
    school: PropTypes.object.isRequired,
    editSchool: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        school: state.schools.school,
    };
};

export default connect(mapStateToProps, { editSchool })(EditSchool);
