import { useState, useRef, useEffect } from 'react';
import { SendIcon, Sparkles, RefreshCw, Bot, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { cn } from '@/lib/utils';
import { chatAPI } from '@/api/api';
import { Message } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const activeConversation = useStore(state => state.getActiveConversation());
  const sendMessage = useStore(state => state.sendMessage);
  const isLoading = useStore(state => state.isTyping);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages = activeConversation ? activeConversation.messages : [];

  // Scroll to bottom when messages change or when typing starts/stops
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    await sendMessage(inputValue);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.focus();
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

  const clearChat = () => {
    // This function is not used
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      {/* {messages.length > 0 && (
        <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 py-3 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-mate-600" />
            <h3 className="font-medium text-slate-800 dark:text-slate-200">OptiMate Assistant</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat} 
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            <span>New Chat</span>
          </Button>
        </div>
      )} */}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        {messages.length === 0 ? (
          // Empty state
          <div className="h-full flex flex-col items-center justify-center px-6 py-12 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-mate-100 to-mate-200 flex items-center justify-center mb-5 shadow-lg shadow-mate-100/20"
            >
              <Sparkles className="w-8 h-8 text-mate-600" />
            </motion.div>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-semibold bg-gradient-to-r from-mate-600 to-mate-500 bg-clip-text text-transparent mb-3"
            >
              How can I assist you today?
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed"
            >
              I can help you optimize code, explain algorithms, and provide programming guidance.
              Just type your question below or try one of these examples.
            </motion.p>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl w-full"
            >
              {[
                "Analyze my React component for performance issues",
                "Help me optimize this database query",
                "Suggest a data structure for this problem",
                "Show me a faster way to implement this algorithm"
              ].map((suggestion, index) => (
                <motion.div
                  key={suggestion}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3 glass-button w-full hover:bg-mate-50 dark:hover:bg-slate-800/60 transition-all duration-300 hover:border-mate-300 dark:hover:border-mate-600 group"
                    onClick={() => {
                      setInputValue(suggestion);
                      if (inputRef.current) {
                        inputRef.current.focus();
                        inputRef.current.style.height = 'auto';
                        inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 24 * 5)}px`;
                      }
                    }}
                  >
                    <span className="truncate group-hover:text-mate-600">{suggestion}</span>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          // Message list
          <div className="space-y-4 px-4 pt-4">
            <AnimatePresence>
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "py-4 flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] md:max-w-[75%] rounded-2xl p-4",
                    message.role === "user"
                      ? "bg-mate-500 text-white rounded-tr-none"
                      : "bg-slate-100 dark:bg-slate-800 rounded-tl-none",
                    message.role === "system" && "bg-red-100 dark:bg-red-900/30"
                  )}>
                    <div className="flex items-center">
                      {message.role === "user" ? (
                        <>
                          {/* <span className="font-medium">You</span> */}
                          {/* <User className="h-4 w-4" /> */}
                        </>
                      ) : message.role === "assistant" ? (
                        <>
                          {/* <Bot className="h-4 w-4 text-mate-500 dark:text-mate-400" /> */}
                          {/* <span className="font-medium">OptiMate</span> */}
                        </>
                      ) : (
                        <span className="font-medium text-red-600 dark:text-red-400">System</span>
                      )}
                    </div>
                    <MessageBubble
                      message={message}
                      isLastMessage={i === messages.length - 1}
                      renderMarkdown={true}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 flex justify-start"
              >
                <div className="bg-slate-100 dark:bg-slate-800 max-w-[85%] md:max-w-[75%] rounded-2xl p-4 rounded-tl-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-mate-500 dark:text-mate-400" />
                    <span className="font-medium">OptiMate</span>
                  </div>
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 px-4 py-4">
        <div className="relative flex flex-col max-w-4xl mx-auto">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about code optimization..."
            disabled={isLoading}
            className={cn(
              "resize-none pr-12 py-3 min-h-[56px] glass-input leading-relaxed focus-ring",
              "shadow-lg shadow-slate-200/20 dark:shadow-none border-slate-200 dark:border-slate-700",
              "transition-all duration-200 ease-in-out",
              inputValue ? "h-auto" : "h-[56px]",
              isLoading && "opacity-80"
            )}
            maxLength={4000}
          />
          <div className="flex justify-between items-center mt-2 text-xs text-slate-500 dark:text-slate-400 px-2">
            <span className="text-xs">Press Shift+Enter for a new line</span>
            <span className={cn(
              inputValue.length > 3000 && "text-amber-500",
              inputValue.length > 3800 && "text-red-500 font-medium"
            )}>
              {inputValue.length}/4000
            </span>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              "absolute right-2 bottom-[calc(50%-12px)] p-2 h-auto rounded-full transition-all duration-200",
              !inputValue.trim() || isLoading ? "opacity-50" : "opacity-100 hover:scale-110 hover:bg-mate-600",
              "bg-mate-500 hover:shadow-md hover:shadow-mate-500/25"
            )}
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <SendIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
