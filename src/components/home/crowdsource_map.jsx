import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Widget from './rainfall_widget';
import Form from './form';

// Configure the default icon
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function LegendControl({ position }) {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <h4>Legend</h4>
        <div><span class="circle blue"></span> Low Water Level</div>
        <div><span class="circle yellow"></span> Medium Water Level</div>
        <div><span class="circle red"></span> High Water Level</div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map, position]);

  return null;
}

function Map() {
  const [markers, setMarkers] = useState([]);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.114:8000/crowdsource/map/');
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid map data format');
        }
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (mapData) {
      const leafletMarkers = mapData.map((marker) => (
        <Marker key={marker.latitude + marker.longitude} position={[marker.latitude, marker.longitude]}>
          <CircleMarker center={[marker.latitude, marker.longitude]} radius={marker.waterlevel / 2}>
          </CircleMarker>
        </Marker>
      ));
      setMarkers(leafletMarkers);
    }
  }, [mapData]);

  if (!mapData) {
    return <p>Loading map data...</p>;
  }

  return (
    <>
        {markers}   
    </>
  );
}

export default Map;
