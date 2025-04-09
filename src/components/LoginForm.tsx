import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { login, signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if we're on the signup page
  const isSignUp = location.pathname === '/signup';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up logic
        await signup(email, password);
        toast({
          title: 'Account created',
          description: 'Your account has been created successfully.',
        });
      } else {
        // Login logic
        await login(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        variant: 'destructive',
        title: isSignUp ? 'Sign up failed' : 'Login failed',
        description: isSignUp 
          ? 'There was a problem creating your account. Please try again.' 
          : 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg bg-card/80 backdrop-blur-md border-border/50">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">O</span>
          </div>
        </div>
        <CardTitle className="text-2xl text-center">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp 
            ? 'Enter your information to create your account' 
            : 'Enter your credentials to access your account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
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
                className="text-xs text-primary hover:text-primary/80"
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
      </CardContent>
      <CardFooter className="text-center text-sm">
        {isSignUp ? (
          <p className="w-full">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p className="w-full">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
