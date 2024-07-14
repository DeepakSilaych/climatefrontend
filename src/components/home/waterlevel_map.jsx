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
  const [chartRange, setChartRange] = useState({ start: 0, end: 720 });

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

          // Adjust water level values greater than 340 to 0
          const adjustedData = data.data.map(entry => ({
            ...entry,
            parameter_values: {
              ...entry.parameter_values,
              us_mb: parseInt(entry.parameter_values.us_mb) > 300 ? 0 : parseInt(entry.parameter_values.us_mb),
              
            },
          }));

          // Calculate mean and standard deviation for the last 40 values
          // const last40Values = adjustedData.slice(-400).map(entry => parseInt(entry.parameter_values.us_mb));
          // const mean = last40Values.reduce((acc, value) => acc + value, 0) / last40Values.length;
          // const standardDeviation = Math.sqrt(last40Values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / last40Values.length);

          // Adjust values outside mean ± 5 standard deviations to 0
          // const lowerLimit = mean - 5 * standardDeviation;
          // const upperLimit = mean + 5 * standardDeviation;
          // adjustedData.forEach(entry => {
          //   const value = parseInt(entry.parameter_values.us_mb);
          //   if (value < lowerLimit || value > upperLimit) {
          //     entry.parameter_values.us_mb = 0;
          //   }
          // });

          setWaterLevelData({ ...data, data: adjustedData });

          // Set chart range to show the latest data
          const latestStart = Math.max(0, adjustedData.length - 720);
          setChartRange({ start: latestStart, end: adjustedData.length });
        }
      } catch (error) {
        console.error('Error fetching water level data:', error);
      }
    };
    fetchWaterLevelData();
  }, [activestation]);

  const customIcon = new Icon({
    iconUrl: require('../../icons/wmarker.png'),
    iconSize: [50, 50],
  });

  const handleNext = () => {
    if (chartRange.end < waterLevelData.data.length) {
      setChartRange((prevRange) => ({
        start: prevRange.start + 1,
        end: prevRange.end + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (chartRange.start > 0) {
      setChartRange((prevRange) => ({
        start: prevRange.start - 1,
        end: prevRange.end - 1,
      }));
    }
  };

  const formatTimeLabel = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
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
            <Popup minWidth={600}>
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
                      {/* <h3>Water Level Over Time (last 12 hours)</h3> */}
                      <button
                        onClick={handleNext}
                        disabled={chartRange.end >= waterLevelData.data.length}
                        className="text-white"
                      >
                        <img src={rightArrow} alt="Next" width="20" />
                      </button>
                    </div>
                    <Chart
                      width={'600px'}
                      height={'300px'}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Time', 'Water Level'],
                        ...waterLevelData.data
                          .slice(chartRange.start, chartRange.end)
                          .map((entry) => [
                            formatTimeLabel(entry.time * 1000),
                            parseInt(entry.parameter_values.us_mb),
                          ]),
                      ]}
                      options={{
                        title: 'Water Level Over Time (last 12 hours)',
                        pointSize: 5,  // Add this line to show dots
                dataOpacity: 0.8, 
                        hAxis: {
                          title: '',
                          slantedText: true,
                          slantedTextAngle: 315,
                          ticks: waterLevelData.data
                            .slice(chartRange.start, chartRange.end)
                            .filter((_, idx) => idx % 2 === 0)
                            .map((entry) => new Date(entry.time * 1000)),
                        },
                        vAxis: {
                          title: 'Water Level',
                          viewWindow: {
                            min: 0,
                          },
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
