import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

import { fetchTrainStations } from '../utils/TrainAPI';
import { useState } from 'react';
import { TrainLegends } from '../components/home/Legends';


function TrainFlood() {
  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchTrainStations();
        setData(data);
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStationsData();
  }, []);

  const handleMarkerClick = (marker) => {
    console.log(marker);
  }


  return (
    <div className="flex h-screen">
      <div className="w-screen h-5/6  m-2">
        <MapContainer
            className='h-full w-full z-10'
            center={[19.1, 72.9]}
            zoom={11}
            maxZoom={18}
            minZoom={11}
            maxBounds={[
                [19.4, 72.6],
                [18.85, 73.2]
            ]}
        >
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Climate IIT Bombay'
            />

            {data && data.map((station, index) => {
              let color;
              if (station.WarningLevel == 0) {
                color = 'green';
              } else if (station.WarningLevel == 1) {
                color = 'yellow';
              } else if (station.WarningLevel == 2) {
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
                >
                  <Popup className="popup-content"> {station.station_name} </Popup>
                </CircleMarker>
                );
              })
            }
        </MapContainer>
        <TrainLegends />
      </div>
      {/* <div className="w-1/3 h-full p-4">
        
        <h1 className="text-3xl font-bold text-center">Train Flood Information</h1>
        <ul className="list-disc ml-5 mt-4">
          <li>Current status of the flood</li>
          <li>Affected areas</li>
          <li>Rescue operations underway</li>
          <li>Contact information for help</li>
          <li>Preventive measures</li>
        </ul>
      </div> */}
    </div>
  );
}

export default TrainFlood;

