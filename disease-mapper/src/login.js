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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
    // Clear error message when user starts typing again
    if (error) setError('');
  };

  const loginUser = async () => {
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
        navigate('/home');
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login request failed. Please try again.');
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <input
        className={styles.input}
        type="text"
        name="username"
        value={loginDetails.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        value={loginDetails.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <button className={styles.button} onClick={loginUser}>
        Login
      </button>
    </div>
  );
};

export default Login;
