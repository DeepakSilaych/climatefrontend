import axios from 'axios';

export const fetchTweetMap = async () => {
    try {
        const response = await axios.get('https://api.mumbaiflood.in/cs/tweetmap/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};


export const fetchTweetList = async () => {
    try {
        const response = await axios.get('https://api.mumbaiflood.in/cs/tweet/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
}