import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapView.module.css';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

const geocodePostcode = async (postcode) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    postcode
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    } else {
      console.error('No results found for postcode:', postcode);
      return null;
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

const MapView = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchAndGeocodeReports = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_FLASK_PORT}/getDiseaseReports`
        );
        const { status, data } = await response.json();
        if (status === 'SUCCESS') {
          const geocodedReports = await Promise.all(
            data.map(async (report) => {
              const coords = await geocodePostcode(report.postcode);
              return { ...report, ...coords };
            })
          );
          // Group reports by postcode
          const groupedByPostcode = geocodedReports.reduce((acc, report) => {
            const { postcode, diseaseName, lat, lng } = report;
            if (!acc[postcode]) {
              acc[postcode] = { lat, lng, diseases: [diseaseName] };
            } else {
              acc[postcode].diseases.push(diseaseName);
            }
            return acc;
          }, {});

          // Convert the grouped reports into an array suitable for rendering
          const reportsForRendering = Object.keys(groupedByPostcode).map(
            (postcode) => {
              const { lat, lng, diseases } = groupedByPostcode[postcode];
              return {
                position: { lat, lng },
                popupText: `Diseases: ${diseases.join(', ')}`,
              };
            }
          );
          setReports(reportsForRendering);
        }
      } catch (error) {
        console.error('Failed to fetch or geocode reports:', error);
      }
    };

    fetchAndGeocodeReports();
  }, []);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map((report, index) => (
          <Marker
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            key={index}
            position={[report.position.lat, report.position.lng]}
          >
            <Popup>{report.popupText}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
