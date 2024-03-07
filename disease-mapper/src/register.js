import React from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [nhsID, setNhsID] = useState('');
    const [postcode, setPostCode] = useState('');
    const [email, setEmail] = useState('');

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
                        <Nav.Link href="#TODO" className="nav-link">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />

            <h1> REGISTER UR DETAILS </h1>
        
            <input className='input' type='text' name='username' value={username} placeholder='Username:' color='white' onChange={e => setUsername(e.target.value)} />
            <input className='input' type='text' name='username' value={nhsID} placeholder='Username:' color='white' onChange={e => setNhsID(e.target.value)} />
            <input className='input' type='text' name='username' value={postcode} placeholder='Username:' color='white' onChange={e => setPostCode(e.target.value)} />
            <input className='input' type='text' name='username' value={email} placeholder='Username:' color='white' onChange={e => setEmail(e.target.value)} />





        </div>
    )
}
export default Register;
