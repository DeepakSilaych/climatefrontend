import "leaflet/dist/leaflet.css";
import {  Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import stationImage from '../../icons/download.png';
import { Chart } from "react-google-charts";
import { fetchWaterStations } from "../../utils/WaterlevelApis";
import { useEffect, useState } from "react";




export default function WaterlevelMap({setLocations, location}) {
  const [stations, setStations] = useState([]);

  const handleMarkerClick = (marker) => {
    console.log(marker);
  }

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

  
    return (
      <>
        {stations.map((station, index) => (
          <Marker
            key={index}
            position={{ lat: station.latitude, lng: station.longitude }}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(station) }}
          >
          <Popup className="custom-popup">
            <div>
              <h3>{station.name}</h3>
              <img src={stationImage} alt="Station" width="300px" height="300px" />
              <TimeSeriesChart />
            </div>
          </Popup>
          </Marker>
        ))}
      </>
    );
  }


// Define a blue circle icon for the second type of markers
const customIcon = new Icon({
  iconUrl: require("../../icons/aa.png"),
  iconSize: [50, 50 ] 
});


function TimeSeriesChart() {
  const data = [
    ["Time", "Water Level"],
    ["00:00", 0],
    ["01:00", 1],
    ["02:00", 2],
    ["03:00", 1.5],
    ["04:00", 1.7],
    ["05:00", 2.1],
    ["06:00", 2.5],
    ["07:00", 3],
    ["08:00", 2.8],
    ["09:00", 3.5],
    ["10:00", 3.8],
    ["11:00", 4],
    ["12:00", 4.2],
    ["13:00", 4.5],
    ["14:00", 4.8],
    ["15:00", 5],
    ["16:00", 5.2],
    ["17:00", 5.5],
    ["18:00", 5.7],
    ["19:00", 6],
    ["20:00", 6.2],
    ["21:00", 6.5],
    ["22:00", 6.8],
    ["23:00", 7],
  ];

  const options = {
    title: "Water Level Over Time",
    hAxis: { title: "Time" },
    vAxis: { title: "Water Level (m)", minValue: 0 },
    legend: { position: "none" },
    backgroundColor: "transparent",
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  );
}
