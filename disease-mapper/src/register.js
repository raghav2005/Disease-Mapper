import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import styles from './Register.module.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nhsID, setNhsID] = useState('');
    const [postcode, setPostcode] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const validateFields = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required...";
        if (!email.trim()) newErrors.email = "Email is required...";
        if (!postcode.trim()) newErrors.postcode = "Postcode is required...";
        if (!password.trim()) newErrors.password = "Password is required...";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const registerUser = async () => {
        if (!validateFields()) return; // Stop the registration process if validation fails

        try {
            const response = await fetch(
                `http://localhost:${process.env.REACT_APP_FLASK_PORT}/registerUser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        nhsID: nhsID,
                        postcode,
                        password,
                    }),
                }
            );
            const data = await response.json();

            if (data.status === 'SUCCESS') {
                alert('User registered successfully');
                setUser({
                    username: data.user.username,
                    email: data.user.email,
                    nhsID: data.user.nhsID,
                    postcode: data.user.postcode,
                });
                navigate('/map');
            } else {
                alert('User registration failed: ' + data.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration request failed. Please try again.');
        }
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        if (errors[e.target.name]) {
            // Clear the error for this field when the user starts typing
            const newErrors = {...errors};
            delete newErrors[e.target.name];
            setErrors(newErrors);
        }
    };

    return (
        <div className={styles.register}>
            <h1>Register Your Details</h1>
            {[
                { label: "Username *", type: "text", id: "username", name: "username", value: username, onChange: handleChange(setUsername), placeholder: errors.username },
                { label: "Email *", type: "email", id: "email", name: "email", value: email, onChange: handleChange(setEmail), placeholder: errors.email },
                { label: "NHS ID", type: "text", id: "nhsID", name: "nhsID", value: nhsID, onChange: handleChange(setNhsID), placeholder: '' },
                { label: "Postcode *", type: "text", id: "postcode", name: "postcode", value: postcode, onChange: handleChange(setPostcode), placeholder: errors.postcode },
                { label: "Password *", type: "password", id: "password", name: "password", value: password, onChange: handleChange(setPassword), placeholder: errors.password },
            ].map((field, index) => (
                <div key={index} className={styles.inputContainer}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
                        type={field.type}
                        id={field.id}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        required={!field.optional}
                    />
                </div>
            ))}
            <button className={styles.button} onClick={registerUser}>Register</button>
        </div>
    );
};

export default Register;
