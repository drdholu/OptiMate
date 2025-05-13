import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chatAPI } from '@/api/api'; // Import the chat API

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isTyping: boolean;
  isNewChat: boolean;
}

interface AppState extends UserState, ChatState {
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;

  // Chat actions
  setActiveConversation: (conversationId: string) => void;
  createNewConversation: () => void;
  deleteConversation: (conversationId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  getActiveConversation: () => Conversation | undefined;
  setIsTyping: (isTyping: boolean) => void;
  startNewChat: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      isAuthenticated: false,
      user: null,

      // Chat state
      conversations: [],
      activeConversationId: null,
      isTyping: false,
      isNewChat: true,

      // Auth actions
      login: async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful login
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Demo User',
            email,
            avatar: `https://avatar.vercel.sh/${email}`
          }
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          activeConversationId: null
        });
      },

      signup: async (name, email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful signup
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name,
            email,
            avatar: `https://avatar.vercel.sh/${email}`
          }
        });
      },

      // Chat actions
      setActiveConversation: (conversationId) => {
        set({ activeConversationId: conversationId });
      },

      startNewChat: () => {
        set({
          activeConversationId: null,
          isNewChat: true
        });
      },

      createNewConversation: () => {
        const newId = Date.now().toString();
        const newConversation = {
          id: newId,
          title: 'New Conversation',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now()
        };

        set(state => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: newId,
          isNewChat: false
        }));
      },

      deleteConversation: (conversationId) => {
        set(state => {
          const filteredConversations = state.conversations.filter(
            conv => conv.id !== conversationId
          );

          // If we're deleting the active conversation, set a new active one or null
          let newActiveId = state.activeConversationId;
          if (state.activeConversationId === conversationId) {
            newActiveId = filteredConversations.length > 0 ? filteredConversations[0].id : null;
          }

          return {
            conversations: filteredConversations,
            activeConversationId: newActiveId
          };
        });
      },

      sendMessage: async (content) => {
        const { activeConversationId, conversations, isNewChat } = get();
        let currentId = activeConversationId;

        // Create a new conversation if none exists or we're starting a new chat
        if (!currentId || isNewChat) {
          const newId = Date.now().toString();
          const newConversation = {
            id: newId,
            title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          set(state => ({
            conversations: [newConversation, ...state.conversations],
            activeConversationId: newId,
            isNewChat: false
          }));
          currentId = newId;
        }

        if (!currentId) return; // Should not happen, but safety check

        // Add user message
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          content,
          role: 'user',
          timestamp: Date.now()
        };

        set(state => {
          const updatedConversations = state.conversations.map(conv => {
            if (conv.id === currentId) {
              // Update title only if it's the very first message in a newly created conversation
              const isFirstMessage = conv.messages.length === 0;
              const title = isFirstMessage
                ? userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? '...' : '')
                : conv.title;

              return {
                ...conv,
                title, // Update title if needed
                messages: [...conv.messages, userMessage],
                updatedAt: Date.now()
              };
            }
            return conv;
          });

          return {
            conversations: updatedConversations,
            isTyping: true
          };
        });

        try {
          // Call the actual backend API
          const response = await chatAPI.sendMessage(content);

          if (response && response.text && currentId) { // Check if currentId is still valid
            const assistantMessage: Message = {
              id: response.id || `assistant-${Date.now()}`, // Use ID from response if available
              content: response.text,
              role: 'assistant',
              timestamp: Date.now()
            };

            set(state => {
              const finalConversations = state.conversations.map(conv => {
                if (conv.id === currentId) {
                  return {
                    ...conv,
                    messages: [...conv.messages, assistantMessage],
                    updatedAt: Date.now()
                  };
                }
                return conv;
              });

              return {
                conversations: finalConversations,
                isTyping: false
              };
            });
          } else {
             console.error('Invalid API response:', response);
             // Add error message to chat
            const errorMessage: Message = {
              id: `system-${Date.now()}`,
              content: response.error || 'Failed to get a response from the assistant.',
              role: 'system',
              timestamp: Date.now()
            };
             set(state => {
               const finalConversations = state.conversations.map(conv => {
                 if (conv.id === currentId) {
                   return { ...conv, messages: [...conv.messages, errorMessage] };
                 }
                 return conv;
               });
               return { conversations: finalConversations, isTyping: false };
             });
          }
        } catch (error) {
          console.error('Error sending message:', error);
          const errorMessage: Message = {
            id: `system-${Date.now()}`,
            content: 'An error occurred while communicating with the backend.',
            role: 'system',
            timestamp: Date.now()
          };
          // Need to get currentId again in case it changed while waiting for API
          const finalCurrentId = get().activeConversationId;
          set(state => {
            const finalConversations = state.conversations.map(conv => {
              if (conv.id === finalCurrentId) { // Use potentially updated currentId
                return { ...conv, messages: [...conv.messages, errorMessage] };
              }
              return conv;
            });
            return { conversations: finalConversations, isTyping: false };
          });
        }
      },

      getActiveConversation: () => {
        const { activeConversationId, conversations } = get();
        if (!activeConversationId) return undefined;

        return conversations.find(conv => conv.id === activeConversationId);
      },

      setIsTyping: (isTyping) => {
        set({ isTyping });
      }
    }),
    {
      name: 'optimate-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        conversations: state.conversations,
        activeConversationId: state.activeConversationId
      }),
    }
  )
);

export type { AppState };
