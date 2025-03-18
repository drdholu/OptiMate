
import { memo } from 'react';
import { type Message } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLastMessage?: boolean;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(undefined, { 
    hour: '2-digit', 
    minute: '2-digit'
  });
}

const MessageBubble = ({ message, isLastMessage }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-5 group animate-fade-in",
        isUser 
          ? "bg-transparent" 
          : "bg-slate-50/80 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800/40"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          isUser 
            ? "bg-mate-100 text-mate-700" 
            : "bg-mate-500 text-white"
        )}>
          {isUser 
            ? <User size={16} /> 
            : <Bot size={16} />
          }
        </div>
      </div>
      
      {/* Message content */}
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {isUser ? 'You' : 'OptiMate'}
          </p>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        <div className={cn(
          "message-content prose prose-slate prose-sm max-w-none dark:prose-invert",
          isLastMessage && "animate-slide-in",
          isUser ? "prose-p:text-slate-600 dark:prose-p:text-slate-300" : "prose-p:text-slate-700 dark:prose-p:text-slate-200"
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageBubble);
