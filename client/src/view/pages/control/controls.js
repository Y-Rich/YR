import axios from 'axios';

export default function controls() {
  const doControl = async (commandId, name) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
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

  const doControlValue = async (commandId, commandValue, name) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
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
}
