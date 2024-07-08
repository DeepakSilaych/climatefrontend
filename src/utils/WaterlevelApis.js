import axios from 'axios';


export const fetchsensorlist = async () => {
    try {
        const response = await axios.get('https://api.mumbaiflood.in/cs/sensorlist/');
        
        const sensorList = response.data.map(sensor => ({
            id: sensor.id,
            name: sensor.name,
            latitude: sensor.latitude,
            longitude: sensor.longitude,
            address: sensor.address
        }));

        return sensorList;
    } catch (error) {
        console.error('Error accessing sensor list:', error);
        return [];
    }
};

export const fetchwaterleveldata = async (thingId) => {
    const url = `https://api.mumbaiflood.in/cs/waterleveldata/${thingId}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching last 24 hours data:', error);
        return null;
    }
};
