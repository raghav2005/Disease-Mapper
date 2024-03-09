import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/home">Disease Mapper</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Nav.Link href="#TODO" className="nav-link">Report</Nav.Link>
                </Nav>
                <Nav className="me-auto" id='right_side_navbar'>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Nav.Link href="/" className="nav-link">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default NavBar;
