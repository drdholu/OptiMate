
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  isSignUp?: boolean;
}

const LoginForm = ({ isSignUp = false }: LoginFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        if (!name) {
          toast({
            title: "Name required",
            description: "Please enter your name to create an account.",
            variant: "destructive",
          });
          return;
        }
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Error is handled in auth context
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6 glass-card p-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-lg bg-mate-500 mx-auto flex items-center justify-center text-white font-bold text-2xl">
          O
        </div>
        <h1 className="text-2xl font-bold">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {isSignUp
            ? 'Sign up to start optimizing your code'
            : 'Log in to continue with OptiMate'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input focus-ring"
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-input focus-ring"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isSignUp && (
              <Link
                to="/forgot-password"
                className="text-xs text-mate-600 hover:text-mate-700 dark:text-mate-400 dark:hover:text-mate-300"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="glass-input focus-ring"
            required
            minLength={6}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isSignUp ? 'Creating account...' : 'Logging in...'}
            </>
          ) : (
            isSignUp ? 'Create account' : 'Log in'
          )}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-mate-600 hover:text-mate-700 dark:text-mate-400 dark:hover:text-mate-300 font-medium"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-mate-600 hover:text-mate-700 dark:text-mate-400 dark:hover:text-mate-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
