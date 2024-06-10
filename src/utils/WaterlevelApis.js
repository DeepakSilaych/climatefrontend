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
