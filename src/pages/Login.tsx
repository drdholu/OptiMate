
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  if (isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md animate-fade-in">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
