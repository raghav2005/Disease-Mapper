import Button from 'react-bootstrap/Button';
import React from 'react';
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import './App.css';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Register from "./register.js";

const search = async () => {
    const response = await fetch("http://localhost:" + process.env.REACT_APP_FLASK_PORT + "/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "hello"
    });
    return response;
}

function Aux() {
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

            {/* The map container must have a defined height, ensure this is set in your CSS */}
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "400px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

function App() {
  // Ensure everything you want to render is inside the return statement

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Aux />}/>
                <Route path="/register" element={<Register />} />
                {/* <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} /> */}
    
            </Routes>
        </BrowserRouter>
    );
}

export default App;
