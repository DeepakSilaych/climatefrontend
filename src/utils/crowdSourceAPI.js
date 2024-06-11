import axios from 'axios';


export function sendFormData(formData) {
    try {
        const response = axios.post('https://api.mumbaiflood.in/cs/data/', formData);
        return response.data;
      } catch (error) {
        console.error('Error storing data:', error);
        throw error;
      }
    }
  
export function fetchCrowdDatta() {
    try {
        const response = axios.get('https://api.mumbaiflood.in/cs/map/');
        return response.data;
      }
      catch (error) {
        console.error('Error fetching map data:', error);
        throw error;
      }
    }