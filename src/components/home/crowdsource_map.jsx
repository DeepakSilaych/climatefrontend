import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { fetchCrowdData } from "../../utils/crowdSourceAPI";
import "leaflet/dist/leaflet.css";

// Function to interpolate between two colors
const interpolateColor = (color1, color2, factor) => {
  if (factor === undefined) factor = 0.5;
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
  }
  return result;
};
              

// Convert hex to RGB
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

// Convert RGB to hex
const rgbToHex = (rgb) => {
  return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
};

// Function to get color based on water level
const getColorByWaterLevel = (waterlevel, minLevel, maxLevel) => {
  const lowColor = hexToRgb("#00FF00"); // Green
  const highColor = hexToRgb("#FF0000"); // Red
  const factor = (waterlevel - minLevel) / (maxLevel - minLevel);
  const interpolatedColor = interpolateColor(lowColor, highColor, factor);
  return rgbToHex(interpolatedColor);
};

// Function to create custom icons based on water level
const createCustomIcon = (waterlevel, minLevel, maxLevel) => {
  const color = getColorByWaterLevel(waterlevel, minLevel, maxLevel);
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      border-radius: 10%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      font-weight: bold;">
        ${waterlevel.toFixed()}
      </div>`,
    className: "",
  });
};

export default function Map() {
  const [mapData, setMapData] = useState([]);
  const [minLevel, setMinLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await fetchCrowdData();
        setMapData(data);
        const levels = data.map(d => d.waterlevel);
        setMinLevel(Math.min(...levels));
        setMaxLevel(Math.max(...levels));
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, []);

  return (
    mapData.map((data, index) => (
        <Marker 
          key={index} 
          position={[data.latitude, data.longitude]} 
          icon={createCustomIcon(data.waterlevel, minLevel, maxLevel)}
        >
          <Popup>
            <div>
              <h1 className="text-lg font-semibold">{`Reported WaterLevel: ${data.waterlevel.toFixed(2)} mm`}</h1>
              <h2 className="text-lg font-semibold">{`Latitude: ${data.latitude.toFixed(3)}`}</h2>
              <h2 className="text-lg font-semibold">{`Longitude: ${data.longitude.toFixed(3)}`}</h2>
            </div>
          </Popup>
        </Marker>
      ))
  );
}
