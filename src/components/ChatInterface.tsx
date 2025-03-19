import { useState, useRef, useEffect } from 'react';
import { SendIcon, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { cn } from '@/lib/utils';
import { chatAPI } from '@/api/api';
import { Message } from '@/lib/store';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // const { 
  //   getActiveConversation, 
  //   sendMessage, 
  //   isTyping, 
  //   createNewConversation,
  //   activeConversationId
  // } = useStore();
  
  // const conversation = getActiveConversation();
  // const messages = conversation?.messages || [];
  
  // Scroll to bottom when messages change or when typing starts/stops
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on mount and when conversation changes
  // useEffect(() => {
  //   if (inputRef.current) {
  //     setTimeout(() => {
  //       inputRef.current?.focus();
  //     }, 100);
  //   }
  // }, [activeConversationId]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, { id: "user", text: inputValue, role: "user", timestamp: Date.now(), content: inputValue }]);
    setInputValue('');

    try {
      const response = await chatAPI.sendMessage(inputValue);

      // Add AI response to chat
      setMessages(prevMessages => [...prevMessages, { id: "ai", text: response.text, role: "assistant", timestamp: Date.now(), content: response.text }]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error appropriately (e.g., display an error message)
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea (up to 5 lines)
    e.target.style.height = 'auto';
    const newHeight = Math.min(e.target.scrollHeight, 24 * 5); // 5 lines max
    e.target.style.height = `${newHeight}px`;
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.length === 0 ? (
          // Empty state
          <div className="h-full flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-mate-100 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-mate-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              How can I assist you today?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
              I can help you optimize code, explain algorithms, and provide programming guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg">
              {[
                "Analyze my React component for performance issues",
                "Help me optimize this database query",
                "Suggest a data structure for this problem",
                "Show me a faster way to implement this algorithm"
              ].map((suggestion) => (
                <Button 
                  key={suggestion}
                  variant="outline" 
                  className="justify-start text-left h-auto py-3 glass-button"
                  onClick={() => {
                    setInputValue(suggestion);
                    if (inputRef.current) {
                      inputRef.current.focus();
                      inputRef.current.style.height = 'auto';
                      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 24 * 5)}px`;
                    }
                  }}
                >
                  <span className="truncate">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          // Message list
          <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {messages.map((message, i) => (
              <MessageBubble 
                key={i} 
                message={message} 
                isLastMessage={i === messages.length - 1}
              />
            ))}
            {/* {isTyping && <TypingIndicator />} */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="sticky bottom-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 px-4 py-4">
        <div className="relative flex items-end max-w-4xl mx-auto">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about code optimization..."
            className={cn(
              "resize-none pr-12 py-3 min-h-[56px] glass-input leading-relaxed focus-ring",
              inputValue ? "h-auto" : "h-[56px]"
            )}
            maxLength={4000}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={cn(
              "absolute right-2 bottom-2 p-2 h-auto rounded-full transition-all duration-200",
              !inputValue.trim() ? "opacity-50" : "opacity-100 hover:scale-105"
            )}
          >
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
