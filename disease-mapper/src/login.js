import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import styles from './Login.module.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
    // Clear error message when user starts typing again
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!loginDetails.username.trim())
      newErrors.username = 'This field is required...';
    if (!loginDetails.password.trim())
      newErrors.password = 'This field is required...';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const loginUser = async () => {
    if (!validateFields()) return; // Stop the login process if validation fails

    try {
      const response = await fetch(
        'http://localhost:' + process.env.REACT_APP_FLASK_PORT + '/loginUser',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginDetails),
        }
      );
      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setUser({
          username: loginDetails.username,
          email: data.email,
          nhsID: data.nhsID,
          postcode: data.postcode,
        });
        navigate('/');
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Incorrect username or password',
        }));
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Login request failed. Please try again.',
      }));
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      {errors.general && (
        <div className={styles.errorMessage}>{errors.general}</div>
      )}
      <div className={styles.inputContainer}>
        <label htmlFor="username">Username</label>
        <input
          className={`${styles.input} ${
            errors.username ? styles.inputError : ''
          }`}
          type="text"
          name="username"
          id="username"
          value={loginDetails.username}
          placeholder={errors.username}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          className={`${styles.input} ${
            errors.password ? styles.inputError : ''
          }`}
          type="password"
          name="password"
          id="password"
          value={loginDetails.password}
          placeholder={errors.password}
          onChange={handleChange}
        />
      </div>
      <button className={styles.button} onClick={loginUser}>
        Login
      </button>
    </div>
  );
};

export default Login;
