
import React, { useEffect, useState } from "react";
import { fetchCrowdDatta } from "../../utils/crowdSourceAPI";
import { Marker } from "leaflet";
import { Popup } from "react-leaflet";

export default function Map (){
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await fetchCrowdDatta();
        setMapData(data);
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, []);

  return (
    <>
      {mapData &&  mapData.map((data, index) => {
          <Marker
            key={index}
            position={[data.latitude, data.longitude]}
          >
            <Popup>
              <div>
                <h1 className="text-2xl font-semibold">{data.location}</h1>
                <h1 className="text-lg font-semibold">{data.waterlevel}</h1>
              </div>
            </Popup>
          </Marker>
      })}
    </>
  );
}