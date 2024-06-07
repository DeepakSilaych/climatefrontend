import axios from 'axios';

export const fetchStations = async () => {
    try {
        const response = await axios.get('http://api.mumbaiflood.in/aws/stations/');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};


export const fetchStationData = async (stationId) => {
    try {
        const response = await axios.get(`http://api.mumbaiflood.in/aws/stations/${stationId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}

