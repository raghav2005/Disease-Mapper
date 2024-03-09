import React from 'react';
import { useState } from 'react';
import NavBar from "./index.js";

const registerUser = async (username, email, NHSID, postcode, password) => {
    const response = await fetch('http://localhost:' + process.env.REACT_APP_FLASK_PORT + '/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, email, NHSID, postcode})
    });
    const data = await response.json();
    if (data.status === 'SUCCESS') {
        alert("User registered successfully");
        return;
    }
    alert("User registration failed");
    return data;
}

function Register() {
    const [username, setUsername] = useState('');
    const [nhsID, setNhsID] = useState('');
    const [postcode, setPostcode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className = 'App'>
            <NavBar />
            <br />

            <h1> REGISTER UR DETAILS </h1>

            <input className='input' type='text' name='username' value={username} placeholder='Username:' color='white' onChange={e => setUsername(e.target.value)} required="required" />
            <input className='input' type='email' name='email' value={email} placeholder='Email:' color='white' onChange={e => setEmail(e.target.value)} required="required" pattern="([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" />
            <input className='input' type='text' name='nhsID' value={nhsID} placeholder='NHS ID:' color='white' onChange={e => setNhsID(e.target.value)} required="required" />
            <input className='input' type='text' name='postcode' value={postcode} placeholder='Postcode:' color='white' onChange={e => setPostcode(e.target.value)} required="required" />
            <input className='input' type='password' name='password' value={password} placeholder='Password:' color='white' onChange={e => setPassword(e.target.value)} required="required" />
            <button className='sendButton' onClick={() => registerUser(username, email, nhsID, postcode, password)} >Register</button>
        </div>
    )
}
export default Register;
