// HomePage.js
import React from 'react';
import MapView from './MapView';
import stylesBig from './index.module.css';

const MapPage = () => (
    <div className={stylesBig.App}>
        <MapView />
    </div>
);

export default MapPage;
