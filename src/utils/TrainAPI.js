import axios from 'axios';

export const fetchTrainStations = async () => {
    try {
        const response = await axios.get('https://api.mumbaiflood.in/aws/train/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};