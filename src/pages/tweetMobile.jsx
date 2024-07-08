import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { fetchTweetList, fetchTweetMap } from '../utils/TweetAPI';


function TweetMobile() {
    const [mapdata, setMapData] = useState(null);
    const [listdata, setListData] = useState(null);


  useEffect(() => {
    const fetchtweetMap = async () => {
      try {
        const response = await fetchTweetMap();
        setMapData(response);
        console.log("data:", response);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    const fetchtweetlist = async () => {
        try {
            const response = await fetchTweetList();
            setListData(response);
            
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
        }

    fetchtweetMap();
    fetchtweetlist();
  }, []);

  return (
    <div className="flex flex-col">
        <div className="w-full h-screen m-2 border-0 border-black shadow-2xl">
            <MapContainer
                className='h-full w-full z-10'
                center={[19.1, 72.9]}
                zoom={11}
                maxZoom={18}
                minZoom={11}
                maxBounds={[
                    [19.4, 72.6],
                    [18.85, 73.2]
                ]}
            >
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='Climate IIT Bombay'
                />

                {mapdata && mapdata.map((mapdata, index) => {
                    let color;
                    if (mapdata.sentiment === false) {
                        color = 'red';
                    } else {
                        color = 'green';
                    }

                return (
                    <CircleMarker
                    key={index}
                    center={{ lat: mapdata.latitude, lng: mapdata.longitude }}
                    color='black'
                    fillColor={color}
                    fill={true}
                    fillOpacity={1}
                    radius={10}
                    >
                    <Popup className="popup-content"> 
                        <p className='text-sm font-thin'>
                            {mapdata.tweet_text}
                            <hr />
                            Sentiment: {mapdata.sentiment === false ? 'Negative' : 'Positive'}
                            <br />
                            Location: {mapdata.address}
                            <br />
                            {mapdata.timestamp && new Date(mapdata.timestamp).toLocaleString()} 
                        </p>
                    </Popup>
                    </CircleMarker>
                    );
                })
                }
            </MapContainer>
        </div>
        <div className="w-full h-screen p-4">
            <h1 className=" w-2/3 text-3xl font-bold text-center">Tweet Analysis</h1>
            <div className="flex flex-col gap-2 overflow-y-scroll h-5/6 border-2 border-black p-2">
                {listdata && listdata.map((tweet, index) => (
                    <div key={index} className={`border-2 border-black p-2 rounded-lg ${tweet.sentiment===false ? 'bg-red-300' : 'bg-green-300'} `} >
                        <p className="text-sm font-thin">
                            {tweet.tweet_text}
                            <hr />
                            Sentiment: {tweet.sentiment === false ? 'Negative' : 'Positive'}
                            <br />
                            Location: {tweet.address}
                            <br />
                            {tweet.timestamp && new Date(tweet.timestamp).toLocaleString()} 
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default TweetMobile;

