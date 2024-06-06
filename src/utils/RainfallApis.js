import axios from 'axios';

export const fetchStations = async () => {
    try {
        const response = await axios.get('http://192.168.0.114:8000/aws/stations/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};


export const fetchStationData = async (stationId) => {
    try {
        const response = await axios.get(`http://192.168.0.114:8000/aws/station/${stationId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}


export const fetchRainfallData = async (stationId) => {
    try {
        const response = await axios.get(`http://192.168.0.114:8000/aws/rainfall/${stationId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}

export const fetchAllData = async (stationId) => {
    try {
        const response = await axios.get(`http://192.168.0.114:8000/aws/alldata/${stationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}