import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchStations } from '../../utils/RainfallApis';
import { use } from 'i18next';

const SearchBar = ({ setSelectedOption, selectedOption }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [stations, setStations] = useState([{ name: 'loading...' }]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setShowOptions(e.target.value !== '');
    };

    const handledropdown = () => {
        setShowOptions(!showOptions);
        setSearchTerm('');
    }

    const handleStationSelection = (station) => {
        setSearchTerm(station.name);
        setShowOptions(false);
        setSelectedOption(station); 
        console.log('selected station:', station);
    }

    useEffect(() => {
        const fetchStationsData = async () => {
            try {
                const data = await fetchStations();
                setStations(data);
                if (data.length) {
                    setSelectedOption(data[0]);
                    setSearchTerm(data[0].name);
                }
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        }
        
        fetchStationsData();
    }, []);

    useEffect(() => {
        if (selectedOption) {
            setSearchTerm(selectedOption.name);
        }
    }, [selectedOption]);

    return (
        <div className="w-full h-12">
            <div className={`bg-white rounded text-black flex border border-black'${ showOptions ? 'rounded-t-md' : 'rounded-md'}`}>
                <input
                    id="search-input"
                    className={`w-full px-4 py-2  focus:outline-none ${
                        showOptions ? 'rounded-t-md' : 'rounded-md'
                    }`}
                    type="text"
                    placeholder="Search Stations.."
                    autoComplete="off"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <div className='dropdown flex flex-col justify-center cursor-pointer' onClick={handledropdown}>
                    {showOptions ? (
                        <span className={''}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                        </span>
                    ) : (

                        <span className={''}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                        </span>
                    )}
                </div>
            </div>
            
            <div className="max-h-[20rem] overflow-y-scroll border border-slate-500 relative z-20 ">
                {stations
                    .filter((station) => station.name.toLowerCase().includes(searchTerm))
                    .map((station) =>
                        showOptions ? (
                            <button
                                key={station.id}
                                className="px-4 py-2 text-gray-500 bg-white border border-gray-100 hover:bg-gray-100 hover:text-black active:bg-blue-100 cursor-pointer w-full text-left"
                                onClick={() => handleStationSelection(station)}>
                                {station.name}
                            </button>
                        ) : null
                    )
                }            
            </div>
        </div>
    );
};

export default SearchBar;
