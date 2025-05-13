import React from 'react';
import { memo } from 'react';
import { Message } from '@/lib/store';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';

export interface MessageBubbleProps {
  message: Message;
  isLastUserMessage?: boolean;
  renderMarkdown?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isLastUserMessage = false,
  renderMarkdown = true
}) => {
  const isUser = message.role === 'user';
  
  // Process code blocks to add syntax highlighting class
  const processedContent = message.content
    .replace(/```(\w+)?\n/g, (match, lang) => {
      return `\`\`\`${lang || ''}\n`;
    });
  
  return (
    <div className={cn(
      "flex gap-3 w-full py-2",
      isUser ? "justify-end" : "justify-start"
    )}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      
      {/* Message Content */}
      <div className={cn(
        "rounded-xl p-4 max-w-[85%]",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-accent rounded-tl-none"
      )}>
        <div className="w-full message-content">
          {renderMarkdown ? (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {processedContent}
            </ReactMarkdown>
          ) : (
            <p className="whitespace-pre-wrap">
              {message.content}
            </p>
          )}
        </div>
      </div>
      
      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-primary" />
        </div>
      )}
    </div>
  );
};

export default memo(MessageBubble);
