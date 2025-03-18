
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 px-4 py-6 bg-slate-50/80 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800/40 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mate-500 text-white animate-pulse-light">
          <Bot size={16} />
        </div>
      </div>
      
      {/* Message content */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <p className="text-sm font-medium">OptiMate</p>
        
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-mate-400 animate-bounce-light" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-mate-400 animate-bounce-light" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-mate-400 animate-bounce-light" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
