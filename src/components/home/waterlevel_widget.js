import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; 
import plac from '../../icons/wmarker.png';
import { fetchsensorlist } from '../../utils/WaterlevelApis';

export default function WaterlevelMap({ width, height, setLocation, location }) {
  const [warning, setWarning] = useState(true);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchsensorlist();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStationsData();
  }, []);

  const handleStationClick = (station) => {
    setLocation(station);
  };

  const canalSensorIds = [14413, 14442, 12472];
  const roadSensorIds = stations
    .filter(station => !canalSensorIds.includes(station.id))
    .map(station => station.id);

  return (
    <div className='text-xl w-96 rounded-xl bg-opacity-80 bg-black h-max mx-2 my-5 flex flex-col p-4 shadow-lg z-10' style={{ width, height }}>
      <style>{`
        @keyframes blinker {
          50% { opacity: 0; }
        }
        .blinking-text {
          animation: blinker 1.5s linear infinite;
        }
        .heading {
          border: 2px solid;
          border-radius: 8px;
          padding: 5px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .canal-heading {
          border-color: #4CAF50; /* Green */
          color: #4CAF50; /* Green */
        }
        .road-heading {
          border-color: #2196F3; /* Blue */
          color: #2196F3; /* Blue */
        }
      `}</style>
      <div className='relative flex justify-center'>
        <div className='w-1/2 flex justify-evenly text-xs text-amber-400 font-bold flex-col text-center'>
          <img src={plac} alt="IIT Logo" width="60" height="60" className='mx-8 mt-5'/>
          LIVE Waterlevel Monitoring
        </div>
      </div>

      <div className='justify-center flex-col gap-3 position-relative mt-5'>
        <div className='text-center heading canal-heading'>
          Canal Sensors
        </div>
        {stations
          .filter(station => canalSensorIds.includes(station.id))
          .map((station, index) => (
            <Button
              key={index}
              variant="primary"
              onClick={() => handleStationClick(station)}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#2A2A2C',
                color: '#ffffff', // White text color
                borderRadius: '10px',
                fontWeight: 'bold', // Rounded corners
                padding: '13px 8px', // Padding
                cursor: 'none', // Pointer cursor on hover
                fontSize: '18px',
                marginBottom: '5px', // Adjust space between buttons
                // transition: 'background-color 0.3s ease-in-out', // Smooth transition
                borderStyle: 'solid', // Added border style
                borderWidth: '2px',
              }}
            >
              {station.name}
            </Button>
          ))}
      </div>

      <div className='justify-center flex-col gap-3 position-relative mt-5'>
        <div className='text-center heading road-heading'>
          Road Sensors
        </div>
        {stations
          .filter(station => roadSensorIds.includes(station.id))
          .map((station, index) => (
            <Button
              key={index}
              variant="primary"
              onClick={() => handleStationClick(station)}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#2A2A2C',
                color: '#ffffff', // White text color
                borderRadius: '10px',
                fontWeight: 'bold', // Rounded corners
                padding: '13px 8px', // Padding
                cursor: 'none', // Pointer cursor on hover
                fontSize: '18px',
                marginBottom: '5px', // Adjust space between buttons
                // transition: 'background-color 0.3s ease-in-out', // Smooth transition
                borderStyle: 'solid', // Added border style
                borderWidth: '2px',
              }}
            >
              {station.name}
            </Button>
          ))}
      </div>

      <div className='text-center text-sm text-orange-600 mt-4 blinking-text'>
        *Click on map markers to view Waterlevel
      </div>
    </div>
  );
}
