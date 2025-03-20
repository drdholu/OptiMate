import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',  // Connect to Flask backend
  // timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (message: string): Promise<any> => {
    try {
      const response = await api.post('/chat', { message });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      return { error: 'Failed to communicate with AI.' };
    }
  },
};

export default api;
