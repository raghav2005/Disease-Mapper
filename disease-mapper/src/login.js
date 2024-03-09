import React from 'react';
import { useState, useContext } from 'react';
import { usernameContext } from './App';
import { useNavigate } from 'react-router-dom';
import NavBar from "./index.js";

const loginUser = async (username, password, navigate, setUsername) => {

    const response = await fetch('http://localhost:' + process.env.REACT_APP_FLASK_PORT + '/loginUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    });
    const data = await response.json();
    if (data.status === 'SUCCESS') {
        alert("User logged in successfully");
        navigate('/home');
    } else {
        alert("User log in failed");
        setUsername('');
    }
    
    return data;
}

function Login() {
    const {username, setUsername} = useContext(usernameContext);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return (
        <div className='App'>
            <NavBar />
            <br />
            <div className='App' style={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'50vh'}}>
                <h1> LOGIN </h1>
                <input className='input' type='text' name='username' value={username} placeholder='Username:' color='white' onChange={e => setUsername(e.target.value)} required="required" />
                <input className='input' type='password' name='password' value={password} placeholder='Password:' color='white' onChange={e => setPassword(e.target.value)} required="required" />
                <button className='sendButton' onClick={() => loginUser(username, password, navigate, setUsername)} >Login</button>
            </div>
        </div>
    )
}
export default Login;
