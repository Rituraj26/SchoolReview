import React, { useState } from 'react';

// Importing Manage Account Components
import UpdatePersonalDetails from './UpdatePersonalDetails';
import UpdatePassword from './UpdatePassword';

const ManageAccount = () => {
    const [formData, setFormData] = useState({
        updatePersonalDetails: true,
        updatePassword: false,
    });

    const { updatePersonalDetails, updatePassword } = formData;

    const onClick = (e) => {
        const target = e.target.value;
        if (target === 'updatePersonalDetails') {
            setFormData({
                updatePersonalDetails: true,
                updatePassword: false,
            });
        } else if (target === 'updatePassword') {
            setFormData({
                updatePersonalDetails: false,
                updatePassword: true,
            });
        }
    };

    return (
        <div className="col-md-8 my-3">
            <div className="row">
                <button
                    className="btn btn-primary ml-5"
                    value="updatePersonalDetails"
                    onClick={(e) => onClick(e)}
                >
                    Update Personal Details
                </button>
                <button
                    className="btn btn-primary ml-5"
                    value="updatePassword"
                    onClick={(e) => onClick(e)}
                >
                    Update Password
                </button>
            </div>

            {updatePersonalDetails ? (
                <UpdatePersonalDetails />
            ) : updatePassword ? (
                <UpdatePassword />
            ) : (
                <h1>Null</h1>
            )}
        </div>
    );
};

export default ManageAccount;
