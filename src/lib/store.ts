
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          activeConversationId: newId
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
        const { activeConversationId, conversations } = get();
        
        if (!activeConversationId && conversations.length === 0) {
          // Create a new conversation if none exists
          get().createNewConversation();
        }
        
        const currentId = get().activeConversationId;
        if (!currentId) return;
        
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
              return {
                ...conv,
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
        
        // Simulate API response delay (1-3 seconds)
        const responseDelay = Math.floor(Math.random() * 2000) + 1000;
        await new Promise(resolve => setTimeout(resolve, responseDelay));
        
        // Add assistant response
        const responses = [
          "I've analyzed your code and found a possible optimization in the algorithm.",
          "That's a great approach! Let me suggest a few ways to make it more efficient.",
          "The code looks good. If you want to improve performance, consider using memoization here.",
          "I see you're using a nested loop. We could optimize this with a hash map approach.",
          "Your solution works, but there's a potential edge case you might want to handle.",
          "The time complexity of this algorithm is O(n²). We could improve it to O(n log n).",
          "Have you considered using a more declarative approach here?",
          "This is well-structured code. Just a small suggestion: consider extracting this logic into a separate function.",
          "Nice implementation! Another approach could be using a more functional programming style.",
          "I notice you're not handling null values. Would you like me to suggest a more robust solution?"
        ];
        
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          content: responses[Math.floor(Math.random() * responses.length)],
          role: 'assistant',
          timestamp: Date.now()
        };
        
        set(state => {
          const updatedConversations = state.conversations.map(conv => {
            if (conv.id === currentId) {
              // Update conversation title if it's the first message
              const title = conv.messages.length === 1 
                ? conv.messages[0].content.slice(0, 30) + (conv.messages[0].content.length > 30 ? '...' : '') 
                : conv.title;
              
              return {
                ...conv,
                title,
                messages: [...conv.messages, assistantMessage],
                updatedAt: Date.now()
              };
            }
            return conv;
          });
          
          return {
            conversations: updatedConversations,
            isTyping: false
          };
        });
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
