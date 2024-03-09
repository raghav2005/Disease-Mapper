// import Button from 'react-bootstrap/Button';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Register from "./register.js";
import Login from "./login.js";
import NavBar from "./index.js";

export const usernameContext = React.createContext();
// const search = async () => {
//     const response = await fetch("http://localhost:" + process.env.REACT_APP_FLASK_PORT + "/search", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: "hello"
//     });
//     return response;
// }

function Aux() {
    return (
        <div className='App'>
            <NavBar/>
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
    const [username, setUsername] = React.useState("");
  // Ensure everything you want to render is inside the return statement

    return (
        <usernameContext.Provider value={{ username, setUsername }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Aux />} />
                    {/* <Route path="blogs" element={<Blogs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} /> */}
        
                </Routes>
            </BrowserRouter>
        </usernameContext.Provider>
    );
}

export default App;
