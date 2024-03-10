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
        <div className={[styles.register]}>
            <h1>Register Your Details</h1>
            <div className={styles.inputContainer}>
                <label htmlFor="username">Username *</label>
                <input
                    className={styles.input}
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="email">Email *</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="nhsID">NHS ID</label>
                <input
                    className={styles.input}
                    type="text"
                    id="nhsID"
                    value={nhsID}
                    onChange={(e) => setNhsID(e.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="postcode">Postcode *</label>
                <input
                    className={styles.input}
                    type="text"
                    id="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">Password *</label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className={styles.button} onClick={registerUser}>
                Register
            </button>
        </div>
    );
};

export default Register;
