import axios from 'axios';

export const tempHumi = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit1/search',
      {
        Temperature: ['Day', '2023-08-01'],
        Humidity: ['Day', '2023-08-01'],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
