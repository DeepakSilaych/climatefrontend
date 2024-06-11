import axios from 'axios';

export const fetchTrainStations = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/aws/train/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};