import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import ConversationList from '@/components/ConversationList';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Set initial state based on window size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  const sidebarWidth = isCollapsed ? 'w-16' : 'w-72 md:w-80 lg:w-96';
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden pt-16">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-20 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <div className={cn(
          "fixed md:static inset-y-0 left-0 z-40",
          sidebarWidth,
          "transform transition-all duration-300 ease-in-out",
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          "bg-background border-r border-border",
          "pt-16 md:pt-0",
          "h-[calc(100vh-4rem)]",
          "overflow-hidden",
          "flex flex-col"
        )}>
          {/* Sidebar Collapse Button (desktop only) */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-4 right-2 hidden md:flex"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          <div className={cn("flex-1", isCollapsed && "hidden")}>
            <ConversationList />
          </div>
          
          {/* Collapsed Sidebar Content */}
          {isCollapsed && (
            <div className="flex flex-col items-center pt-4 gap-4">
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setIsCollapsed(false);
                  navigate('/dashboard');
                }}
                className="h-10 w-10 rounded-full"
                title="New Chat"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Main Chat Area */}
        <div className={cn(
          "flex-1 min-w-0 overflow-hidden transition-all duration-300",
          isCollapsed && "md:ml-16"
        )}>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Index;
