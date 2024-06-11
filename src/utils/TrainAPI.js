import axios from 'axios';

export const fetchStations = async () => {
    try {
        const response = await axios.get('https://api.mumbaiflood.in/aws/stations/');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};