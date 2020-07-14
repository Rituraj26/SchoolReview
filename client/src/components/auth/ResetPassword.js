import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const ResetPassword = ({ resetPassword, setAlert }) => {
    const { resetToken } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({
        password: '',
        password2: '',
    });

    const { password, password2 } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (password !== password2) {
            setAlert(`Password didn't match`, 'danger');
        } else {
            resetPassword({ password, resetToken });
            history.push('/auth/login');
        }
    };

    return (
        <section className="mt-5 ml-5">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                            <h1 className="mb-2">Reset Password</h1>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        className="form-control"
                                        placeholder="New Password"
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="password2"
                                        value={password2}
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

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword, setAlert })(ResetPassword);
