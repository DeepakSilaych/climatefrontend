import React, { useState } from 'react';
import { sendFormData } from '../../utils/crowdSourceAPI';

function Form() {
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [waterlevelfactor, setWaterlevelfactor] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [activeOption, setActiveOption] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let latitude, longitude;
        const waterLevelAdjusted =  waterlevelfactor * (30.48 * parseInt(feet) + 2.54 * parseInt(inches));

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
          waterlevel: data.waterLevelAdjusted,
          location: location,
          latitude: data.latitude,
          longitude: data.longitude,
      }
  
      console.log('sendata:',sendata);

        try {
            const response = await sendFormData(sendata);
            setMessage(response.message);
        } catch (error) {
            console.error('Error storing data:', error);
            setMessage('Error: Unable to store data.', error);
        }
  };

    const handleOption = (value, option) => () => {
        setWaterlevelfactor(value);
        setActiveOption(option);
    };

    return (
            <div className="max-w-xl mx-auto px-6 py-2 bg-black rounded-lg  bg-opacity-80">
                <h1 className="text-3xl text-center font-semibold mb-6 text-white">Submit Data</h1>
                <div>
                    <div className="flex items-center " >
                        <label htmlFor="height" className="block h-full text-white flex-col justify-center mr-4">Your Height:</label>

                        <select id="height" name="height" value={feet} onChange={(e) => setFeet(e.target.value)} className="w-1/3 mr-4 border rounded-md py-2 px-4 mb-4 bg-blue-50 text-slate-900">
                            <option value="">Select Feet</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                        <select id="height" name="height" value={inches} onChange={(e) => setInches(e.target.value)} className="w-1/3 border rounded-md py-2 px-4 mb-4 bg-blue-50 text-slate-900">
                            <option value="">Select Inches</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <span className="block text-white">Water Level (choose one):</span>
                        <div className="flex justify-evenly">
                            <label htmlFor="waterlevel1" className={`inline-block border-2 ${activeOption === 1 ? "border-red-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.2, 1)}>
                                <img src="/img/crowdsource/1.png" width={100} height={100} alt="Low water level" />
                                <span className='w-full flex justify-center text-white text-[.6rem]'>Ankle</span>
                            </label>

                            <label htmlFor="waterlevel2" className={`inline-block border-2 ${activeOption === 2 ? "border-red-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.4, 2)}>
                                <img src="/img/crowdsource/2.png" width={100} height={100} alt="Medium water level" />
                                <span className='w-full flex justify-center text-white text-[.6rem]'>Knee</span>

                            </label>

                            <label htmlFor="waterlevel3" className={`inline-block border-2 ${activeOption === 3 ? "border-red-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.6, 3)}>
                                <img src="/img/crowdsource/3.png" width={100} height={100} alt="High water level" />
                                <span className='w-full flex justify-center text-white text-[.6rem]'>Waist</span>

                            </label>                            
                            
                            <label htmlFor="waterlevel3" className={`inline-block border-2 ${activeOption === 4 ? "border-red-800" : "border-transparent hover:border-blue-100 "}`} onClick={handleOption(0.9, 4)}>
                                <img src="/img/crowdsource/4.png" width={100} height={100} alt="High water level" />
                                <span className='w-full flex justify-center text-white text-[.6rem]'>Neck and above</span>
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
