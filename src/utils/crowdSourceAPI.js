import axios from 'axios';

export async function sendFormData(formData) {
    try {
        const response = await axios.post('http://localhost:8000/cs/data/', formData);
        return response.data;
    } catch (error) {
        console.error('Error storing data:', error);
        throw error;
    }
}

export async function fetchCrowdData() {
    try {
        const response = await axios.get('http://localhost:8000/cs/map/');
        return response.data;
    } catch (error) {
        console.error('Error fetching map data:', error);
        throw error;
    }
}

export async function fetchLocationData(coords) {
    try {
        const response = await axios.post('http://localhost:8000/cs/location/', coords);
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        console.log('response.data.location: ', response.data.location);

        return response.data.location;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
}