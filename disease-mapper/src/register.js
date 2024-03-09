import React from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";


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
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Disease Mapper</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Nav.Link href="#TODO" className="nav-link">Report</Nav.Link>
                    </Nav>
                    <Nav className="me-auto" id='right_side_navbar'>
                        <Link to="/register" className="nav-link">Register</Link>
                        <Nav.Link href="/login" className="nav-link">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
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
