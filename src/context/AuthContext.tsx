
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, login, logout: storeLogout, signup } = useStore();
  
  // Check authentication status on mount
  useEffect(() => {
    // You could add additional verification logic here if needed
  }, []);
  
  // Enhanced login function with navigation
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  // Enhanced logout function with navigation
  const handleLogout = () => {
    storeLogout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/login');
  };
  
  // Enhanced signup function with navigation
  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      await signup(name, email, password);
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const value = {
    isAuthenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
