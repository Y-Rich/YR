import axios from 'axios';

export const doControl = async (commandId, name) => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/control/edukit1',
      {
        command: commandId,
      }
    );
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to ${name}:`, error);
    throw error;
  }
};

export const doControlValue = async (commandId, commandValue, name) => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/control/edukit1',
      {
        command: commandId,
        value: commandValue,
      }
    );
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to ${name}:`, error);
    throw error;
  }
};
