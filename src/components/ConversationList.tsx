import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ConversationList = () => {
  const conversations = useStore(state => state.conversations);
  const activeConversationId = useStore(state => state.activeConversationId);
  const setActiveConversation = useStore(state => state.setActiveConversation);
  const createNewConversation = useStore(state => state.createNewConversation);
  const deleteConversation = useStore(state => state.deleteConversation);

  return (
    <div className="flex flex-col h-full">
      {/* New Chat Button */}
      <div className="flex-none p-4 border-b border-border">
        <Button
          onClick={createNewConversation}
          className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <AnimatePresence>
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No conversations yet</p>
                <p className="text-sm">Start a new chat to begin</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-1 group"
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 text-left h-auto py-3 px-3",
                      "hover:bg-accent hover:text-accent-foreground",
                      activeConversationId === conversation.id && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate flex-1">{conversation.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-accent/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ConversationList; 