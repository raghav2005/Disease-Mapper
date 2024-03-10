// Register.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import styles from './Register.module.css';
import stylesBig from './index.module.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nhsID, setNhsID] = useState('');
    const [postcode, setPostcode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const registerUser = async () => {
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

    return (
        <div className={styles.register}>
            <h1>Register Your Details</h1>
            {[
                { label: "Username *", type: "text", id: "username", value: username, onChange: setUsername },
                { label: "Email *", type: "email", id: "email", value: email, onChange: setEmail },
                { label: "NHS ID", type: "text", id: "nhsID", value: nhsID, onChange: setNhsID, optional: true },
                { label: "Postcode *", type: "text", id: "postcode", value: postcode, onChange: setPostcode },
                { label: "Password *", type: "password", id: "password", value: password, onChange: setPassword },
            ].map((field, index) => (
                <div key={index} className={styles.inputContainer}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        className={styles.input}
                        type={field.type}
                        id={field.id}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        required={!field.optional}
                    />
                </div>
            ))}
            <button className={styles.button} onClick={registerUser}>Register</button>
        </div>
    );
    
};

export default Register;
