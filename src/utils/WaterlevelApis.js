import axios from 'axios';

export const fetchWaterStations = async () => {
    try {
        const response = await axios.get('https://api.mumbaiflood.in/weather/stations/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};


export const fetchsensorlist = async () => {
    const accessId = 'lX1d9akADFVLiYhB';
    const accessKey = 'NsKeyQDu9zgbED9KINEeYhIvRzbcSr1VKtDhbTMaUQMlAtPA8sOyjDm8Q85CBH9d';
    const url = 'https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10684/applications/16/things/list';

    try {
        const response = await axios.get(url, {
            headers: {
                'Access-Id': accessId,
                'Access-Key': accessKey,
                'Content-Type': 'application/json'
            }
        });
        
        const sensorList = response.data.things.map(sensor => ({
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
    const accessId = 'lX1d9akADFVLiYhB';
    const accessKey = 'NsKeyQDu9zgbED9KINEeYhIvRzbcSr1VKtDhbTMaUQMlAtPA8sOyjDm8Q85CBH9d';
    const url = 'https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10082/applications/16/things/data';

    try {
        const now = new Date();
        const fromTime = Math.floor((now - 24 * 60 * 60 * 1000) / 1000); // Timestamp in seconds
        const uptoTime = Math.floor(now / 1000); // Current timestamp in seconds

        const payload = {
            data_type: 'raw',
            aggregation_period: 0,
            parameters: ['us_mb'],
            parameter_attributes: [],
            things: [thingId],
            from_time: fromTime,
            upto_time: uptoTime
        };

        const response = await axios.post(url, payload, {
            headers: {
                'Access-Id': accessId,
                'Access-Key': accessKey,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching last 24 hours data:', error);
        return null;
    }
};