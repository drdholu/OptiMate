import { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, FileText, BarChart, Calendar, Lightbulb, ChevronDown, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activeConversationId = useStore((state) => state.activeConversationId);
  const activeConversation = useStore((state) => 
    state.conversations.find((c) => c.id === activeConversationId)
  );
  const isLoading = useStore((state) => state.isTyping);
  const sendMessage = useStore((state) => state.sendMessage);
  const createNewConversation = useStore((state) => state.createNewConversation);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    // Create a new conversation if none is active
    if (!activeConversationId) {
      createNewConversation();
    }
    
    await sendMessage(inputValue);
    setInputValue('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isLoading]);
  
  // Check if we need to show the scroll down button
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = messagesEndRef.current?.parentElement;
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
        setShowScrollButton(isScrolledUp);
      }
    };
    
    const scrollContainer = messagesEndRef.current?.parentElement;
    scrollContainer?.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Message Container */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Empty State */}
          {(!activeConversation || activeConversation?.messages.length === 0) && (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Start a new conversation</h3>
              <p className="text-muted-foreground max-w-md mb-8">
                Ask a question or start a conversation with OptiMate, your AI assistant.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                <Card className="bg-card hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Summarize a document
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="bg-card hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="w-4 h-4 mr-2" />
                      Analyze data trends
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="bg-card hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Plan your schedule
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="bg-card hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Creative writing
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeConversation?.messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isLastUserMessage={
                message.role === 'user' &&
                activeConversation.messages
                  .slice(index + 1)
                  .every((m) => m.role !== 'user')
              }
            />
          ))}
          
          {/* Loading indicator when waiting for response */}
          {isLoading && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="py-3 px-4 bg-accent rounded-lg">
                <TypingIndicator />
              </div>
            </div>
          )}
          
          {/* Scroll to bottom indicator */}
          {showScrollButton && (
            <button
              className="fixed bottom-20 right-4 md:right-8 z-10 p-2 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-all"
              onClick={scrollToBottom}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative">
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full pr-12 resize-none focus:ring-primary"
              rows={1}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-1.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          <div className="mt-2 text-xs text-muted-foreground text-center">
            OptiMate may produce inaccurate information. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
