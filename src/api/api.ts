
// import axios from 'axios';
// import { Message, Conversation } from '../lib/store';

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: '/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add response interceptor to simulate API delay
// api.interceptors.response.use(
//   (response) => {
//     // Simulate network delay
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(response);
//       }, Math.random() * 800 + 200);
//     });
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // API endpoints
// export const chatAPI = {
//   sendMessage: async (message: string, conversationId?: string): Promise<Message> => {
//     try {
//       // This would normally be a real API call
//       // For now, we'll simulate a response
//       const response = await api.post('/chat', { message, conversationId });
//       return response.data;
//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw error;
//     }
//   },
  
//   getConversations: async (): Promise<Conversation[]> => {
//     try {
//       const response = await api.get('/history');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//       throw error;
//     }
//   },
  
//   getConversation: async (conversationId: string): Promise<Conversation> => {
//     try {
//       const response = await api.get(`/history/${conversationId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching conversation:', error);
//       throw error;
//     }
//   },
  
//   deleteConversation: async (conversationId: string): Promise<void> => {
//     try {
//       await api.delete(`/history/${conversationId}`);
//     } catch (error) {
//       console.error('Error deleting conversation:', error);
//       throw error;
//     }
//   }
// };

// export const userAPI = {
//   login: async (email: string, password: string) => {
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       return response.data;
//     } catch (error) {
//       console.error('Error logging in:', error);
//       throw error;
//     }
//   },
  
//   signup: async (name: string, email: string, password: string) => {
//     try {
//       const response = await api.post('/auth/signup', { name, email, password });
//       return response.data;
//     } catch (error) {
//       console.error('Error signing up:', error);
//       throw error;
//     }
//   },
  
//   logout: async () => {
//     try {
//       await api.post('/auth/logout');
//     } catch (error) {
//       console.error('Error logging out:', error);
//       throw error;
//     }
//   },
  
//   getProfile: async () => {
//     try {
//       const response = await api.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       throw error;
//     }
//   }
// };

// export const settingsAPI = {
//   getSettings: async () => {
//     try {
//       const response = await api.get('/settings');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching settings:', error);
//       throw error;
//     }
//   },
  
//   updateSettings: async (settings: any) => {
//     try {
//       const response = await api.put('/settings', settings);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating settings:', error);
//       throw error;
//     }
//   }
// };

// // Mock data and API handlers
// // This would be on the server in a real application
// if (process.env.NODE_ENV === 'development') {
//   // Mock API response for axios
//   const mockAPIHandlers = () => {
//     // @ts-ignore - mock adapter setup
//     api.mockAdapter = {
//       onPost: (url: string, callback: (data: any) => any) => {
//         // Mock implementation
//       },
//       onGet: (url: string, callback: () => any) => {
//         // Mock implementation
//       },
//       onDelete: (url: string, callback: () => any) => {
//         // Mock implementation
//       }
//     };
//   };
// }

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',  // Connect to Flask backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (message: string): Promise<any> => {
    try {
      const response = await api.post('/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      return { error: 'Failed to communicate with AI.' };
    }
  },
};

export default api;
