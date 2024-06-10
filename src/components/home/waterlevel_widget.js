import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; 
import plac from '../../icons/aa.png';
import { fetchWaterStations } from '../../utils/WaterlevelApis';


export default function WaterlevelMap({ width, height, setLocation, location }) {
    const [warning, setWarning] = useState(true);


    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchStationsData = async () => {
          try {
            const data = await fetchWaterStations();
            setStations(data);
          } catch (error) {
            console.error("Error fetching stations:", error);
          }
        };
    
        fetchStationsData();
      } , []);

    const handleStationClick = (station) => {
        setLocation(station);
    };

    if (warning) {
       return <WarningPopup setWarning={setWarning} />
    }

    return (
        <div className='text-xl w-max rounded-xl bg-opacity-80 bg-black h-max mx-0 my-0 flex flex-col p-4 shadow-lg z-10 ' style={{ width, height }}>
            <div className='relative flex justify-center '>
                {/* Display current date, time, and temperature */}
                <div className='w-1/2 flex justify-evenly text-xs text-amber-400  font-bold flex-col text-center'>
                                      
                    <img src={plac} alt="IIT Logo" width="40" height="40" className='mx-14'/>
                    LIVE Waterlevel Monitoring
                </div>
                <div className='w-1/2 flex flex-col justify-evenly mx-0'>
                    <div className='flex flex-col text-center'>
                        <button className=" zigzag-button alert-button" onClick={() => alert('Report Flood')}>
                            Report Flood
                        </button>
                    </div>
                </div>
                
            </div>

            <div className=' justify-center flex-col gap-1 position-relative'>
                {stations.map((station, index) => (
                    <Button
                        key={index}
                        variant="primary"
                        onClick={() => handleStationClick(station)}
                        style={{
                            backgroundColor: location === station ? '#EE4E4E' : 'transparent',
                            borderColor: '#EE4E4E',
                            color: '#ffffff', // White text color
                            borderRadius: '10px',
                            fontWeight: 'bold', // Rounded corners
                            padding: '3px 8px', // Padding
                            cursor: 'pointer', // Pointer cursor on hover
                            fontSize: '12px',
                            marginBottom: '5px', // Adjust space between buttons
                            transition: 'background-color 0.3s ease-in-out', // Smooth transition
                            borderStyle: 'solid', // Added border style
                            borderWidth: '2px',
                        }}
                    >
                        {station.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}


const WarningPopup = ({ setWarning }) => {
    return (
        <div className=' w-full text-center bg-red-500 text-white p-4 rounded-lg border-black border-4'>
            <p className='text-2xl z-20'>
                Waterlevel Monitoring Sensors are under installation.
                <br />
                Dummy data is being displayed.

            </p>
            <Button onClick={() => setWarning(false)} className='text-xl underline'>Close</Button>
        </div>
    );
}
