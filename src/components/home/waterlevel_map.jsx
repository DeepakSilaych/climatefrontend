import "leaflet/dist/leaflet.css";
import {  Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import stationImage from '../../icons/download.png';
import { Chart } from "react-google-charts";
// import { fetchWaterStations } from "../../utils/WaterlevelApis";
import { useEffect, useState } from "react";
import { fetchsensorlist, fetchwaterleveldata } from "../../utils/WaterlevelApis";



export default function WaterlevelMap({setLocations, location}) {
  const [stations, setStations] = useState([]);
  const [waterLevelData, setWaterLevelData] = useState([]);
  const [activestation, setActivestation] = useState(null);

  const handleMarkerClick = (marker) => {
    setActivestation(marker);
  }

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchsensorlist();
        setStations(data);
        console.log(data);
      }
      catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    fetchStationsData();
  } , []);  

  useEffect(() => {
    const fetchWaterLevelData = async () => {
      try {
        const data = await fetchwaterleveldata(activestation.id);
        setWaterLevelData(data);
        console.log(waterLevelData.data);
      }
      catch (error) {
        console.error('Error fetching water level data:', error);
      }
    };
    fetchWaterLevelData(); 
    console.log(waterLevelData.data);
  }, [activestation]);
  
    return (
    <>
      {stations.map((station, index) => (
        <Marker
          key={index}
          position={{ lat: station.latitude, lng: station.longitude }}
          icon={customIcon}
          eventHandlers={{ click: () => handleMarkerClick(station) }}
        >
          <Popup>
            <div>
              <h3>{station.name}</h3>
              <p>{station.address}</p>
              <Chart
                chartType="LineChart"
                width="100%"
                height="200px"
                data={waterLevelData.data}
                options={{
                  hAxis: {
                    title: "Time",
                  },
                  vAxis: {
                    title: "Water Level",
                  },
                  legend: "none",
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </div>
          </Popup>
        
        </Marker>
      ))}
    </>
  );
}


const customIcon = new Icon({
  iconUrl: require("../../icons/aa.png"),
  iconSize: [25, 25 ] 
});



