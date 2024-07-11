import "leaflet/dist/leaflet.css";
import { Popup, CircleMarker, useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import '../../styles.css';
import { fetchStations } from "../../utils/RainfallApis";

export default function RainFallMap({ location, setLocations, zoomToLocation }) {
    const [stations, setStations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const markerRefs = useRef([]);
    const map = useMap();

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

    useEffect(() => {
        if (zoomToLocation) {
            // Smooth zoom out and then zoom in transition
            const zoomToStation = () => {
                // Zoom out first
                map.setView(zoomToLocation, 10, { animate: true });
                setTimeout(() => {
                    // Then zoom in to the selected station
                    map.setView(zoomToLocation, 14, { animate: true });
                    const selectedStation = stations.find(station => station.id === zoomToLocation.id);
                    if (selectedStation) {
                        handleMarkerMouseOver(selectedStation);
                    }
                }, 1000); // Adjust timing as needed
            };

            zoomToStation();
        }
    }, [zoomToLocation, map, stations]);

    useEffect(() => {
        // Open popup when location changes
        if (location) {
            const selectedStation = stations.find(station => station.id === location.id);
            if (selectedStation) {
                handleMarkerMouseOver(selectedStation);
            }
        }
    }, [location, stations]);

    return (
        <div className="h-full w-full relative">
            {stations.map((station, index) => {
                let color;
                if (station.rainfall > 204.4) {
                    color = 'red';
                } else if (station.rainfall > 115.5) {
                    color = 'orange';
                } else if (station.rainfall > 64.4) {
                    color = 'yellow';
                } else if (station.rainfall > 15.5) {
                    color = 'skyblue';
                } else if (station.rainfall > 0) {
                    color = 'lightgreen';
                } else {
                    color = 'grey';
                }

                const isSelected = selectedMarker === station;
                const radius = isSelected ? 16 : 8;

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
                        pathOptions={{ color: isSelected ? 'white' : 'black' }}
                    >
                        <Popup className="popup-content">{station.name}</Popup>
                    </CircleMarker>
                );
            })}
        </div>
    );
}
