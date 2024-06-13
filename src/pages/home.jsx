import React, { useState, useEffect } from 'react';
import Map from '../components/home/crowdsource_map'; 
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import { MapContainer, TileLayer } from 'react-leaflet';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_wdget';
import WaterlevelWidget from '../components/home/waterlevel_widget';
import SearchBar from '../components/home/searchbar';
import RainfallLegend from '../components/home/Legends';

function Home() {
    const [selectedTab, setSelectedTab] = useState(parseInt(localStorage.getItem('selectedTab')) || 1);
    const [rainfallLocations, setRainfallLocations] = useState(null);
    const [waterlevelLocations, setWaterlevelLocations] = useState(null);
    const [showModal, setShowModal] = useState(!localStorage.getItem('hideModal'));

    const handletabChange = (tab) => {
        setSelectedTab(tab);
        localStorage.setItem('selectedTab', tab);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleDontShowAgain = () => {
        localStorage.setItem('hideModal', 'true');
        setShowModal(false);
    }

    useEffect(() => {
        if (!localStorage.getItem('hideModal')) {
            setShowModal(true);
        }
    }, []);

    return (
        <div className='h-full w-full bg-['>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center w-2/3">
                        <h2 className="text-xl font-bold mb-4">Important Information!</h2>
                        <ul className="text-left mb-4">
                            <li>1. Rainfall forecasted values (also known as 'Nowcasts') are being updated at every 1 hour, and being displayed on the Rainfall widget.</li>
                            <li>2. Rainfall forecasts for the next 3 days are being displayed on the Rainfall widget.</li>
                            <li>3. FORM for reporting water levels in your area is available under 'Reported Flood' tab on the Home Page.</li>
                            <li>4. Near real time waterlogging information obtained from nine water-level sensors installed across Mumbai is available under Waterlevel widget.</li>
                            <li>5. Our Hourly rainfall forecast model is still still under improvement.</li>
                        </ul>
                        <div className="flex justify-around">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded" 
                                onClick={handleModalClose}
                            >
                                OK
                            </button>
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded" 
                                onClick={handleDontShowAgain}
                            >
                                Don't show again
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='w-full h-full'> 
                <div className='h-full flex flex-row-reverse justify-between z-10'>
                    <div className='h-[90%] mr-3 flex flex-col justify-center w-8/12 overflow-hidden shadow-2xl rounded-lg border-2 relative'>
                        <MapContainer
                            className='h-full w-full z-10'
                            center={[19.05, 72.9]}
                            zoom={10}
                            maxZoom={18}
                            minZoom={12}
                            maxBounds={[
                                [19.4, 72.6],
                                [18.85, 73.2]
                            ]}
                        >
                            <TileLayer 
                                url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png?api_key=d42390ee-716f-47d9-b8e5-2b8b44c5d63f"
                                minZoom={0}
                                maxZoom={18}
                                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                ext='png'
                            />
                            
                            {selectedTab === 1 && <RainFallMap setLocations={setRainfallLocations} location={rainfallLocations} />}
                            {selectedTab === 2 && <WaterlevelMap />}
                            {selectedTab === 3 && <Map />}
                        </MapContainer>
                        {selectedTab === 1 && <RainfallLegend />}
                        
                    </div>
                    <div className='relative w-1/3 mt-0 p-1 flex flex-col' >
                        <div className="z-20 mb-2 w-full mx-auto flex justify-center">
                            <span
                                className={`h-[2rem] w-1/5 flex items-center justify-center  text-center text-sm font-serif cursor-pointer rounded-l-xl transition-all duration-300 ${
                                    selectedTab === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                } shadow-xl`}
                                onClick={() => handletabChange(1)}
                            >
                                Rainfall
                            </span>
                            <span
                                className={`h-[2rem] w-1/5 flex items-center justify-center text-center text-sm font-serif cursor-pointer transition-all duration-300 ${
                                    selectedTab === 2 ? 'bg-gradient-to-r from-red-500 to-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                } shadow-xl`}
                                onClick={() => handletabChange(2)}
                            >
                                Waterlevel
                            </span>
                            <span
                                className={`h-[2rem] w-1/4 flex items-center justify-center text-center text-sm font-serif cursor-pointer rounded-r-xl transition-all duration-300 leading-3 ${
                                    selectedTab === 3 ? 'bg-gradient-to-r from-green-500 to-green-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                } shadow-xl`}
                                onClick={() => handletabChange(3)}
                            >
                                Reported Flood
                            </span>
                        </div>

                        {selectedTab === 1 && rainfallLocations && (
                            <div className="z-20">
                                <SearchBar selectedOption={rainfallLocations} setSelectedOption={setRainfallLocations} />
                                <RainfallWidget selectedOption={rainfallLocations} />
                            </div>
                        )}

                        {selectedTab === 2 && (
                            <div className="z-20">
                                <WaterlevelWidget location={waterlevelLocations} setLocation={setWaterlevelLocations} />
                            </div>
                        )}

                        {selectedTab === 3 && (
                            <div className='z-20 mt-0'>
                                <Form />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
