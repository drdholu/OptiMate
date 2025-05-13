import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { Settings, User, LogOut, Plus, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth(); // Get auth state
  const createNewConversation = useStore((state) => state.createNewConversation);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current location
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleNewChat = () => {
    createNewConversation();
    setIsMobileMenuOpen(false);
  };

  // Determine if the user is on the home page
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-lg">
              O
            </div>
            <span className="font-semibold text-xl text-foreground">
              OptiMate
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isHomePage && !isAuthenticated ? (
              <>
                <ThemeToggle />
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            ) : (
              <>
                <ThemeToggle />
                {isAuthenticated && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8 transition-all hover:scale-105">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {user?.name?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
                          <Plus size={16} />
                          <span>New Chat</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer flex items-center gap-2">
                          <Settings size={16} />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                          <User size={16} />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={logout}
                        className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
                      >
                        <LogOut size={16} />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md focus-ring"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/30 transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 h-auto py-4"
              : "opacity-0 -translate-y-4 h-0 py-0 pointer-events-none"
          )}
        >
          <div className="container px-4 flex flex-col gap-2">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              onClick={handleNewChat}
              className="w-full justify-start gap-2"
            >
              <Plus size={16} />
              <span>New Chat</span>
            </Button>
            
            <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings size={16} />
                <span>Settings</span>
              </Button>
            </Link>
            
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User size={16} />
                <span>Profile</span>
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
