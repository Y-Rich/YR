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
export const m1data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit1/search/production-data',
      {
        Line2defectRate: ['Month', '2023-09-05'],
        Line1defectRate: ['Month', '2023-09-05'],
        LineProdRate: ['Month', '2023-09-05'],
        Output: ['Day', '2023-09-05'],
        Input: ['Day', '2023-09-05'],
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const monthM1data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit1/search/production-data',
      {
        Line2defectRate: ['Day', '2023-09-05'],
        Line1defectRate: ['Day', '2023-09-05'],
        LineProdRate: ['Month', '2023-09-05'],
        Output: ['Day', '2023-09-05'],
        Input: ['Day', '2023-09-05'],
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const m2data = async () => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/data/edukit2/search/production-data',
      {
        Line2defectRate: ['Month', '2023-09-05'],
        Line1defectRate: ['Month', '2023-09-05'],
        LineProdRate: ['Month', '2023-09-05'],
        Output: ['Day', '2023-09-05'],
        Input: ['Day', '2023-09-05'],
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
