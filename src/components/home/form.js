import React, { useState } from 'react';
import axios from 'axios';

function Form() {
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [waterlevelfactor, setWaterlevelfactor] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [activeOption, setActiveOption] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let latitude, longitude;
        const waterLevelAdjusted = height * waterlevelfactor;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                sendData({ latitude, longitude, waterLevelAdjusted });
            },  
            (error) => {
                latitude = 0;
                longitude = 0;
                sendData({ latitude, longitude, waterLevelAdjusted });
            }
        );
    };

    const sendData = async (data) => {
      console.log('data:',data);
  
      const sendata = {
          name: name,
          waterlevel: data.waterLevelAdjusted,
          location: location,
          latitude: data.latitude,
          longitude: data.longitude,
      }
  
      console.log('sendata:',sendata);
      try {
          const response = await axios.post(process.env.API_URL || 'http://192.168.0.114:8000/crowdsource/data/', sendata );
          setMessage(response.data.message);
      } catch (error) {
          console.error('Error storing data:', error);
          setMessage('Error: Unable to store data.');
      }
  };

    const handleOption = (value, option) => () => {
        setWaterlevelfactor(value);
        setActiveOption(option);
    };

    return (
            <div className="max-w-xl mx-auto px-6 py-2 bg-black rounded-lg  bg-opacity-40">
                <h1 className="text-3xl text-center font-semibold mb-6 text-white">Submit Data</h1>
                <div>
                    <label htmlFor="name" className="block text-white ">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md py-2 px-4 mb-4 bg-blue-50 text-slate-900" />

                    <label htmlFor="height" className="block text-white">Your Height (cm):</label>
                    <input type="number" id="height" name="height" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border rounded-md py-2 px-4 mb-4 bg-blue-50 text-slate-900" required />

                    <div className="mb-4">
                        <span className="block text-white">Water Level (choose one):</span>
                        <div className="flex justify-evenly">
                            <label htmlFor="waterlevel1" className={`inline-block border-2 ${activeOption === 1 ? "border-blue-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.2, 1)}>
                                <img src="/img/crowdsource/1.svg" width={100} height={100} alt="Low water level" />
                            </label>

                            <label htmlFor="waterlevel2" className={`inline-block border-2 ${activeOption === 2 ? "border-blue-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.4, 2)}>
                                <img src="/img/crowdsource/2.svg" width={100} height={100} alt="Medium water level" />
                            </label>

                            <label htmlFor="waterlevel3" className={`inline-block border-2 ${activeOption === 3 ? "border-blue-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.6, 3)}>
                                <img src="/img/crowdsource/3.svg" width={100} height={100} alt="High water level" />
                            </label>                            
                            
                            <label htmlFor="waterlevel3" className={`inline-block border-2 ${activeOption === 4 ? "border-blue-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.9, 4)}>
                                <img src="/img/crowdsource/3.svg" width={100} height={100} alt="High water level" />
                            </label>
                        </div>
                    </div>

                    <label htmlFor="location" className="block text-white ">Location:</label>
                    <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border rounded-md py-2 px-4 mb-4 bg-blue-50 text-slate-900" />

                    <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button> 
                </div>
                <div className="mt-4 text-white">{message}</div>
            </div>
    );
}

export default Form;
