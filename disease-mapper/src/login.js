import React from 'react';
import { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { usernameContext } from './App';

const loginUser = async (username, password) => {
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
        return;
    }
    alert("User log in failed");
    return data;
}

function Login() {
    const {username, setUsername} = useContext(usernameContext);
    const [password, setPassword] = useState('');

    return (
        <div className='App'>
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
            <div className='App' style={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'50vh'}}>
                <h1> LOGIN </h1>
                <input className='input' type='text' name='username' value={username} placeholder='Username:' color='white' onChange={e => setUsername(e.target.value)} required="required" />
                <input className='input' type='password' name='password' value={password} placeholder='Password:' color='white' onChange={e => setPassword(e.target.value)} required="required" />
                <button className='sendButton' onClick={() => loginUser(username, password)} >Login</button>
            </div>
        </div>
    )
}
export default Login;
