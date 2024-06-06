import axios from 'axios';

export const fetchWaterStations = async () => {
    try {
        const response = await axios.get('http://192.168.0.114:8000/weather/stations/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};
