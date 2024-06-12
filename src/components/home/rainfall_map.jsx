import "leaflet/dist/leaflet.css";
import { Popup, CircleMarker } from "react-leaflet";
import { useEffect, useState, useRef } from "react";  
import '../../styles.css';
import { fetchStations } from "../../utils/RainfallApis";

export default function RainFallMap({ location, setLocations }) {
  const [stations, setStations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markerRefs = useRef([]);

  const handleMarkerClick = (marker) => {
    if (selectedMarker !== marker) {
      setLocations(marker);
      setSelectedMarker(marker);
    } else {
      setSelectedMarker(null);
    }
  };

  const handleMarkerMouseOver = (marker) => {
    markerRefs.current[marker.id].openPopup();
  };

  const handleMarkerMouseOut = (marker) => {
    if (selectedMarker !== marker) {
      markerRefs.current[marker.id].closePopup();
    }
  };

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
        if (!location) {
          setLocations(data[0]);
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStationsData();  
  }, []);

  return (
    <div className="h-full w-full relative">
      {stations.map((station, index) => {
        let color;
        if (station.curr_rainfall < 10) {
          color = 'lightgreen';
        } else if (station.curr_rainfall < 20) {
          color = 'yellow';
        } else if (station.curr_rainfall < 30) {
          color = 'orange';
        } else {
          color = 'red';
        }

        const isSelected = selectedMarker === station;
        const radius = isSelected ? 16 : 8; // Increase radius if selected

        return (
          <CircleMarker
            key={index}
            center={{ lat: station.latitude, lng: station.longitude }}
            color='black'
            fillColor={color}
            fillOpacity={1}
            radius={radius}
            eventHandlers={{ 
              click: () => handleMarkerClick(station), 
              mouseover: () => handleMarkerMouseOver(station), 
              mouseout: () => handleMarkerMouseOut(station) 
            }}
            ref={el => markerRefs.current[station.id] = el}
            pathOptions={{ color: isSelected ? '#FF1493' : 'black' }} // Highlight selected marker
          >
            <Popup className="popup-content">{station.name}</Popup>
          </CircleMarker>
        );
      })}
    </div>
  );
}
