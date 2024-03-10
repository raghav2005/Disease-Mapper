// Register.js
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
      <input
        className={styles.input}
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.input}
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        value={nhsID}
        placeholder="NHS ID"
        onChange={(e) => setNhsID(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        value={postcode}
        placeholder="Postcode"
        onChange={(e) => setPostcode(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.button} onClick={registerUser}>
        Register
      </button>
    </div>
  );
};

export default Register;
