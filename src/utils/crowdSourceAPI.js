import axios from 'axios';


export function sendFormData(formData) {
    try {
        const response = axios.post('http://127.0.0.1:8000/cs/data/', formData);
        return response.data;
      } catch (error) {
        console.error('Error storing data:', error);
        throw error;
      }
    }
  
export function fetchCrowdDatta() {
    try {
        const response = axios.get('http://127.0.0.1:8000/cs/map/');
        return response.data;
      }
      catch (error) {
        console.error('Error fetching map data:', error);
        throw error;
      }
    }