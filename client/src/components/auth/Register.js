import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password1: '',
        password2: '',
    });

    const { name, email, role, password1, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (password1 !== password2) {
        } else {
        }
    };

    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="text"
                    placeholder="role"
                    name="role"
                    value={role}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="text"
                    placeholder="password"
                    name="password1"
                    value={password1}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="text"
                    placeholder="password"
                    name="password2"
                    value={password2}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

export default Register;
