import "leaflet/dist/leaflet.css";
import { Popup, CircleMarker, } from "react-leaflet";
import { useEffect, useState } from "react";  
import '../../styles.css';

import { fetchStations } from "../../utils/RainfallApis";

export default function RainFallMap({location, setLocations}) {
  const [stations, setStations] = useState([]);
  

  const handleMarkerClick = (marker) => {
    setLocations(marker);
  };

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
        if (!location) {
          setLocations(data[0]);
          console.log('rainfall map', location.id)

        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStationsData();  
  }, []);
  return (stations.map((station, index) => {
    let color;
    if (station.curr_rainfall < 10) {
      color = 'green';
    } else if (station.curr_rainfall < 20) {
      color = 'yellow';
    } else if (station.curr_rainfall < 30) {
      color = 'orange';
    } else {
      color = 'red';
    }
  
    return (
      <CircleMarker
        key={index}
        center={{ lat: station.latitude, lng: station.longitude }}
        color='black'
        fillColor={color}
        fill={true}
        fillOpacity={1}
        radius={10}
        eventHandlers={{ click: () => handleMarkerClick(station) }}
      >
        <Popup className="popup-content">{station.name}</Popup>
      </CircleMarker>
    );
  }));
}