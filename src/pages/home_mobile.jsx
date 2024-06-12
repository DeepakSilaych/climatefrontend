// HomeMobile.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Map from '../components/home/crowdsource_map'; 
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_wdget';
import WaterlevelWidget from '../components/home/waterlevel_widget';
import SearchBar from '../components/home/searchbar';
import { RainfallLegendMobile,WaterlevelLegendMobile, TrainLegendMobile } from '../components/home/LegendsMobile';

function HomeMobile() {
    const [selectedTab, setSelectedTab] = useState(parseInt(localStorage.getItem('selectedTab')) || 1);
    const [rainfallLocations, setRainfallLocations] = useState(null);
    const [waterlevelLocations, setWaterlevelLocations] = useState(null);

    const handletabChange = (tab) => {
        setSelectedTab(tab);
        localStorage.setItem('selectedTab', tab);
    }

    return (
        <div className='h-full w-full bg-[#f0f0f0]'>
            <div className='w-full'>
                <div className="mb-2 w-full mx-auto flex justify-center z-10"> {/* Ensure buttons appear above the map */}
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
                </div>
            </div>
            <div className='w-full h-[70%] flex flex-col relative'>
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
                >
                    <TileLayer 
                        url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png?api_key=d42390ee-716f-47d9-b8e5-2b8b44c5d63f"
                        minZoom={0}
                        maxZoom={18}
                        attribution=''
                        ext='png'
                    />
                    {/* Components based on selected tab */}
                    {selectedTab === 1 && <RainFallMap setLocations={setRainfallLocations} location={rainfallLocations} />}
                    {selectedTab === 2 && <WaterlevelMap />}
                    {selectedTab === 3 && <Map />}
                    {/* Legends */}
                    {selectedTab === 1 && <RainfallLegendMobile />}
                    {selectedTab === 2 && <WaterlevelLegendMobile />}
                </MapContainer>
            </div>
            {/* Additional components */}
            <div className='w-full h-[70%] flex flex-col relative z-20'>
                {selectedTab === 1 && rainfallLocations && (
                    <div className="z-20 mt-2">
                        <SearchBar selectedOption={rainfallLocations} setSelectedOption={setRainfallLocations} />
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
                        <Form />
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeMobile;
