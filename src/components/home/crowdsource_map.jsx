import React, { useState, useEffect } from 'react';
import {Marker, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Form from './form';

import { fetchCrowndDatta } from '../../utils/crowdSourceAPI';

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

function Map() {
  const [markers, setMarkers] = useState([]);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCrowndDatta();
        setMapData(response);
      }
      catch (error) {
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
        <Legend className='z-30' />
        {markers}   
    </>
  );
}

export default Map;


const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      
      const legendStyle = {
        backgroundColor: 'white',
        padding: '10px',
        lineHeight: '1.5',
        fontSize: '12px',
        color: '#555',
      };
      
      Object.assign(div.style, legendStyle);

      div.innerHTML += '<i style="background: #ff0000; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i> Red<br>';
      div.innerHTML += '<i style="background: #0000ff; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i> Blue<br>';
      // Add more legend items as needed

      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  return null;
};

