import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updatePassword } from '../../../actions/dashboard';
import { setAlert } from '../../../actions/alert';

const UpdatePassword = ({ updatePassword, setAlert }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        newPassword2: '',
    });

    const { currentPassword, newPassword, newPassword2 } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== newPassword2) {
            setAlert(`Password didn't match`, 'danger');
        } else {
            updatePassword({ currentPassword, newPassword });
        }
    };

    return (
        <section className="mt-5 ml-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <h1 className="mb-2">Update Password</h1>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={currentPassword}
                                        className="form-control"
                                        placeholder="Current Password"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        className="form-control"
                                        placeholder="New Password"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword2"
                                        value={newPassword2}
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Update Password"
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

export default connect(null, { updatePassword, setAlert })(UpdatePassword);
