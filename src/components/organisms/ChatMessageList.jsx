import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from '@/components/molecules/MessageBubble';
import TypingIndicator from '@/components/molecules/TypingIndicator';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const ChatMessageList = ({ 
  messages, 
  loading, 
  error, 
  onRetry, 
  onDeleteMessage,
  currentUserId,
  isTyping = false,
  typingUser = null
}) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (loading) {
    return <Loading type="messages" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} type="chat-load" />;
  }

  if (!messages || messages.length === 0) {
    return (
      <Empty 
        type="messages" 
        onAction={() => {
          // Focus on message input
          const messageInput = document.querySelector('textarea[placeholder="Type a message..."]');
          messageInput?.focus();
        }}
      />
    );
  }

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-2"
    >
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <MessageBubble
              message={message}
              isOwnMessage={message.senderId === currentUserId}
              onDelete={onDeleteMessage}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      <AnimatePresence>
        {isTyping && typingUser && (
          <TypingIndicator userName={typingUser.name} />
        )}
      </AnimatePresence>
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;