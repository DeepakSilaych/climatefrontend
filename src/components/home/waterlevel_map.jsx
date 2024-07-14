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
  const [averages, setAverages] = useState({
    avg5min: 0,
    avg15min: 0,
    avg12hr: 0,
    avg24hr: 0
  });

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

          // Function to remove spikes
          const removeSpikes = (dataN, windowSize = 20, threshold = 2) => {
            const cleanedDataN = [...dataN];
            for (let i = 0; i < dataN.length; i++) {
              const start = Math.max(0, i - windowSize);
              const end = Math.min(dataN.length, i + windowSize + 1);
              const window = dataN.slice(start, end);
              const mean = window.reduce((acc, val) => acc + val, 0) / window.length;
              const stdDev = Math.sqrt(window.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / window.length);
              const zScore = (dataN[i] - mean) / stdDev;
              if (Math.abs(zScore) > threshold) {
                cleanedDataN[i] = window.sort((a, b) => a - b)[Math.floor(window.length / 2)];
              }
            }
            return cleanedDataN;
          };

          const waterLevels = adjustedData.map(entry => parseInt(entry.parameter_values.us_mb));
          const cleanedWaterLevels = removeSpikes(waterLevels);

          const cleanedData = adjustedData.map((entry, index) => ({
            ...entry,
            parameter_values: {
              ...entry.parameter_values,
              us_mb: cleanedWaterLevels[index],
            },
          }));

          setWaterLevelData({ ...data, data: cleanedData });

          const now = Date.now() / 1000; // Current time in seconds
          const calculateAverage = (interval) => {
            const filteredData = cleanedData.filter(entry => now - entry.time <= interval);
            const sum = filteredData.reduce((acc, val) => acc + val.parameter_values.us_mb, 0);
            return filteredData.length > 0 ? sum / filteredData.length : 0;
          };

          setAverages({
            avg5min: calculateAverage(5 * 60),
            avg15min: calculateAverage(15 * 60),
            avg12hr: calculateAverage(12 * 60 * 60),
            avg24hr: calculateAverage(24 * 60 * 60)
          });

          // Set chart range to show the latest data
          const latestStart = Math.max(0, cleanedData.length - 720);
          setChartRange({ start: latestStart, end: cleanedData.length });
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
                <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em' }}>{station.name}</h3>
                <p>{station.address}</p>
                <h4>Average Water Level in last:</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <p>5 min: {averages.avg5min.toFixed(2)} cm</p>
                    <p>15 min: {averages.avg15min.toFixed(2)} cm</p>
                  </div>
                  <div>
                    <p>12 hours: {averages.avg12hr.toFixed(2)} cm</p>
                    <p>24 hours: {averages.avg24hr.toFixed(2)} cm</p>
                  </div>
                </div>
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
                        ['Time', 'Water Level (in cm)'],
                        ...waterLevelData.data
                          .slice(chartRange.start, chartRange.end)
                          .map((entry) => [
                            formatTimeLabel(entry.time * 1000),
                            parseInt(entry.parameter_values.us_mb),
                          ]),
                      ]}
                      options={{
                        title: 'Water Level Over Time (last 12 hours)',
                        pointSize: 1,
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
                          title: 'Water Level (in cm)',
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
