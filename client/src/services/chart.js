import axios from 'axios';

export const tempHumi = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit1/search',
      {
        Temperature: ['Day', '2023-08-01'],
        Humidity: ['Day', '2023-08-01'],
        Particulates: ['Day', '2023-08-01'],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const dailyM1Data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit1/search/production-data',
      {
        Line2defectRate: ['Day', '2023-09-05'],
        Line1defectRate: ['Day', '2023-09-05'],
        LineProdRate: ['Day', '2023-09-05'],
        Output: ['Day', '2023-09-05'],
        Input: ['Day', '2023-09-05'],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const monthM1Data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit1/search/production-data',
      {
        Line2defectRate: ['Month', '2023-09-05'],
        Line1defectRate: ['Month', '2023-09-05'],
        LineProdRate: ['Month', '2023-09-05'],
        Output: ['Month', '2023-09-05'],
        Input: ['Month', '2023-09-05'],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const dailyM2Data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit2/search/production-data',
      {
        Line2defectRate: ['Day', '2023-09-05'],
        Line1defectRate: ['Day', '2023-09-05'],
        LineProdRate: ['Day', '2023-09-05'],
        Output: ['Day', '2023-09-05'],
        Input: ['Day', '2023-09-05'],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const monthM2Data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit2/search/production-data',
      {
        Line2defectRate: ['Month', '2023-09-05'],
        Line1defectRate: ['Month', '2023-09-05'],
        LineProdRate: ['Month', '2023-09-05'],
        Output: ['Month', '2023-09-05'],
        Input: ['Month', '2023-09-05'],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
