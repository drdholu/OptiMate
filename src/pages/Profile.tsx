import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
// ...existing imports if needed...

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-12 flex items-center justify-center">
        <div className="w-full max-w-md glass-card p-8 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          {/* ...additional profile content... */}
        </div>
      </main>
    </div>
  );
};

export default Profile;
