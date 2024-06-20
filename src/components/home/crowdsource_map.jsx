import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { fetchCrowdData } from "../../utils/crowdSourceAPI";
import "leaflet/dist/leaflet.css";


const Map = ({ csPinToggle, csPinDropLocation, setCsPinDropLocation }) => {
  const [mapData, setMapData] = useState([]);
  
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await fetchCrowdData();
        setMapData(data);
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchMapData();
  }, []);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setCsPinDropLocation({ lat: lat, long: lng });
    }

  const ClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <>
    { csPinToggle ? 
        <>
        <ClickHandler/>
        {csPinDropLocation && <Marker position={[csPinDropLocation.lat, csPinDropLocation.long]} icon={pindropicon()} />}
        </>
      : 
        mapData.map((data, index) => (
          <Marker 
            key={index} 
            position={[data.latitude, data.longitude]} 
            icon={createCustomIcon(data.feet, data.inch)}
          >
            <Popup>
              <div>
                <h1 className="text-lg font-semibold">{`Reported WaterLevel: ${data.feet}' ${data.inch}"`}</h1>
                <h2 className="text-lg font-semibold">{`Latitude: ${data.latitude.toFixed(3)}`}</h2>
                <h2 className="text-lg font-semibold">{`Longitude: ${data.longitude.toFixed(3)}`}</h2>
              </div>
            </Popup>
          </Marker>
        ))
    }
    </>
  );
};

export default Map;




const createCustomIcon = (feet, inch) => {
  const getColorByFeetAndInches = (feet, inch) => {
    const totalInches = feet * 12 + inch;
    if (totalInches < 24) {
      return "#FFFF00"; 
    } else if (totalInches >= 24 && totalInches <= 60) {
      return "#FFA500"; 
    } else {
      return "#FF0000";
    }
  };
  const color = getColorByFeetAndInches(feet, inch);
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      border-radius: 10%;
      width: 37px;
      text-align: center;
      height: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      font-weight: bold;
      display: inline-block;
      ">
        ${feet}' ${inch}"
      </div>`
  });
};

const pindropicon = () => {
  return L.icon({
    iconUrl: "/img/loc.png",
    iconSize: [38, 50],
    iconAnchor: [19, 50],
    popupAnchor: [0, -50],
  });
};