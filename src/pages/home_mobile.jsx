import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Map from '../components/home/crowdsource_map'; 
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_wdget';
import WaterlevelWidget from '../components/home/waterlevel_widget';
import SearchBar from '../components/home/searchbar';
import { RainfallLegendMobile, WaterlevelLegendMobile, CrowdsourceLegendsMobile } from '../components/home/LegendsMobile';


function HomeMobile({ warningtab }) {
    const [selectedTab, setSelectedTab] = useState( warningtab || parseInt(localStorage.getItem('selectedTab')) || 1);
    const [rainfallLocations, setRainfallLocations] = useState(null);
    const [waterlevelLocations, setWaterlevelLocations] = useState(null);
    const [showModal, setShowModal] = useState(!localStorage.getItem('hideModal'));
    const [csPinToggle, setCsPinToggle] = useState(false);
    const [csPinDropLocation, setCsPinDropLocation] = useState(null);
    const [zoomToLocation, setZoomToLocation] = useState(null); 
    const mapRef = useRef();
    
    const widgetContainerRef = useRef(null);

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

    const handleScroll = () => {
        if (widgetContainerRef.current) {
            widgetContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='h-full w-full bg-[#f0f0f0]'>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Important Information!</h2>
                        <ul className="text-left mb-4">
                              {/* <li>1. Hourly rainfall forecasts (also known as 'Nowcasts'), displayed on the ‘Rainfall’ widget, are being updated every 1 hour.</li> */}
                        <li>1. Next 3-day rainfall forecasts are being displayed on the ‘Rainfall’ widget.</li>
                        <li>2. FORM for reporting water levels in your area is available under 'Reported Flood' tab on the Home Page.</li>
                        <li>3. Near real-time waterlogging information obtained from nine water-level sensors installed across Mumbai is available under Waterlevel widget.</li>
                        <li>4. The hourly rainfall forecast model is still under improvement.</li>
                        <li>5. Observed data is being sourced from Municipal Corporation of Greater Mumbai (MCGM) (https://dm.mcgm.gov.in/).</li>
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
            <div className='w-full relative'>
                <div className="absolute backdrop:mb-2 w-full mx-auto flex justify-center z-30"> {/* Ensure buttons appear above the map */}
                    <span
                        className={`h-[3rem] w-1/5 flex items-center justify-center  text-center text-sm font-serif cursor-pointer rounded-l-xl transition-all duration-300 ${
                            selectedTab === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        } shadow-xl`}
                        onClick={() => handletabChange(1)}
                    >
                        Rainfall
                    </span>
                    <span
                        className={`h-[3rem] w-1/5 flex items-center justify-center text-center text-sm font-serif cursor-pointer transition-all duration-300 ${
                            selectedTab === 2 ? 'bg-gradient-to-r from-red-500 to-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        } shadow-xl`}
                        onClick={() => handletabChange(2)}
                    >
                        Waterlevel
                    </span>
                    <span
                        className={`h-[3rem] w-1/4 flex items-center justify-center text-center text-sm font-serif cursor-pointer rounded-r-xl transition-all duration-300 ${
                            selectedTab === 3 ? 'bg-gradient-to-r from-green-500 to-green-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        } shadow-xl`}
                        onClick={() => handletabChange(3)}
                    >
                        Reported Flood
                    </span>
                    <div className='absolute scroll-to-top  top-[60px] right-2 z-30'>
                <button onClick={handleScroll} className='rounded-full bg-red-500 text-white text-sm py-2 px-4 alert-button'>
                    Scroll Down
                </button>
            </div>
                </div>
            </div>
            <div className='w-full h-[70%] flex flex-col relative z-10'>
                <MapContainer
                    className='h-full w-full'
                    center={[19.1, 72.9]}
                    zoom={10}
                    maxZoom={18}
                    minZoom={11}
                    maxBounds={[
                        [19.4, 72.6],
                        [18.85, 73.2]
                    ]}
                    ref={mapRef}
                >
                    <TileLayer 
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                        minZoom={0}
                        maxZoom={18}
                        attribution='Climate IIT Bombay'
                        ext='png'
                    />
                    {/* Components based on selected tab */}
                    
                    {selectedTab === 1 && <RainFallMap setLocations={setRainfallLocations} location={rainfallLocations} />}
                    {selectedTab === 2 && <WaterlevelMap />}
                    {selectedTab === 3 && <Map csPinToggle={csPinToggle} csPinDropLocation={csPinDropLocation} setCsPinDropLocation={setCsPinDropLocation} zoomToLocation={zoomToLocation} mapRef={mapRef} />}
                    {/* Legends */}
                    {selectedTab === 1 && <RainfallLegendMobile />}
                    {selectedTab === 2 && <WaterlevelLegendMobile />}
                    {selectedTab === 3 && <CrowdsourceLegendsMobile csPinToggle={csPinToggle} />}
                    
                </MapContainer>
            </div>
            <div className='w-full h-[70%] flex flex-col relative z-20' ref={widgetContainerRef}>
            
                {selectedTab === 1 && rainfallLocations && (
                    <div className="z-20 mt-2">
                        <SearchBar selectedOption={rainfallLocations} setSelectedOption={setRainfallLocations} setZoomToLocation={setZoomToLocation}/>
                        <RainfallWidget selectedOption={rainfallLocations} />
                    </div>
                )}

                {selectedTab === 2 && (
                    <div className="z-20 mt-5">
                        <WaterlevelWidget location={waterlevelLocations} setLocation={setWaterlevelLocations} />
                    </div>
                )}

                {selectedTab === 3 && (
                    <div className='z-20 mt-1'>
                        <Form setCsPinDropLocation={setCsPinDropLocation} csPinDropLocation={csPinDropLocation} setCsPinToggle={setCsPinToggle} csPinToggle={csPinToggle} setZoomToLocation={setZoomToLocation} />
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default HomeMobile;
