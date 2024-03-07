import Button from 'react-bootstrap/Button';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const search = async () => {
    const response = await fetch("http://localhost:" + process.env.REACT_APP_FLASK_PORT + "/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "HI"
    });
    return response;
}

function App() {
  // Ensure everything you want to render is inside the return statement
    return (
        <div className="App">

            <header className="App-header">
                <Button onClick={search} variant="primary">Primary</Button>{' '}
                {/* <Button variant="secondary">Secondary</Button>{' '}
                <Button variant="success">Success</Button>{' '} */}
            </header>

            {/* The map container must have a defined height, ensure this is set in your CSS */}
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "800px" }}>
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

export default App;
