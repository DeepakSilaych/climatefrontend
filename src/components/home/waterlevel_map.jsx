import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { fetchsensorlist, fetchwaterleveldata } from '../../utils/WaterlevelApis';
import rightArrow from '../../icons/right.png';
import leftArrow from '../../icons/left.png';

export default function WaterlevelMap({ setLocations, location }) {
  const [stations, setStations] = useState([]);
  const [waterLevelData, setWaterLevelData] = useState([]);
  const [activestation, setActivestation] = useState(null);
  const [chartRange, setChartRange] = useState({ start: 0, end: 6 }); // Initial range for chart data

  const handleMarkerClick = (marker) => {
    setActivestation(marker);
  };

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchsensorlist();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    fetchStationsData();
  }, []);

  useEffect(() => {
    const fetchWaterLevelData = async () => {
      try {
        if (activestation) {
          const data = await fetchwaterleveldata(activestation.id);
          setWaterLevelData(data);
        }
      } catch (error) {
        console.error('Error fetching water level data:', error);
      }
    };
    fetchWaterLevelData();
  }, [activestation]);

  const customIcon = new Icon({
    iconUrl: require('../../icons/aa.png'),
    iconSize: [25, 25],
  });

  const handleNext = () => {
    if (chartRange.end < waterLevelData.data.length) {
      setChartRange({ start: chartRange.start + 1, end: chartRange.end + 1 });
    }
  };

  const handlePrev = () => {
    if (chartRange.start > 0) {
      setChartRange({ start: chartRange.start - 1, end: chartRange.end - 1 });
    }
  };

  return (
    <>
      {stations.map((station, index) => (
        <Marker
          key={index}
          position={{ lat: station.latitude, lng: station.longitude }}
          icon={customIcon}
          eventHandlers={{ click: () => handleMarkerClick(station) }}
        >
          {activestation && activestation.id === station.id && (
            <Popup>
              <div>
                <h3>{station.name}</h3>
                <p>{station.address}</p>
                {waterLevelData.data && (
                  <div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handlePrev}
                        disabled={chartRange.start === 0}
                        className="text-white"
                      >
                        <img src={leftArrow} alt="Previous" width="20" />
                      </button>
                      <h3>Water Level Over Time</h3>
                      <button
                        onClick={handleNext}
                        disabled={chartRange.end >= waterLevelData.data.length}
                        className="text-white"
                      >
                        <img src={rightArrow} alt="Next" width="20" />
                      </button>
                    </div>
                    <Chart
                      width={'320px'}
                      height={'250px'}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['', 'Water Level'],
                        ...waterLevelData.data
                          .slice(chartRange.start, chartRange.end)
                          .map((entry) => [
                            new Date(entry.time * 1000).toLocaleTimeString(), // Convert timestamp to human-readable date
                            parseInt(entry.parameter_values.us_mb), // Assuming 'us_mb' contains the water level
                          ]),
                      ]}
                      options={{
                        title: 'Water Level Over Time',
                        hAxis: {
                          title: '',
                          slantedText: true,
                         slantedTextAngle: 315,

                        },
                        vAxis: {
                          title: 'Water Level',
                          viewWindow: {
                            min: 0,
                            max: 500
                        },
                        ticks: [0, 100, 200, 300,400, 500]
                        },
                        legend: { position: 'none' }, 
                        
                      }}
                    />
                  </div>
                )}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </>
  );
}
