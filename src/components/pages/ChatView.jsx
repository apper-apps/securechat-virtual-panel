import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ChatMessageList from '@/components/organisms/ChatMessageList';
import MessageInput from '@/components/molecules/MessageInput';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { chatService } from '@/services/api/chatService';
import { messageService } from '@/services/api/messageService';

const ChatView = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Mock current user ID
  const currentUserId = 'user-1';

  const loadChat = async () => {
    try {
      setLoading(true);
      setError(null);
      const chatData = await chatService.getById(chatId);
      setChat(chatData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const messagesData = await messageService.getByChatId(chatId);
      setMessages(messagesData);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  useEffect(() => {
    if (chatId) {
      loadChat();
      loadMessages();
    }
  }, [chatId]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || sendingMessage) return;

    try {
      setSendingMessage(true);
      
      // Create optimistic message
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        chatId,
        senderId: currentUserId,
        content,
        timestamp: Date.now(),
        status: 'sending',
        type: 'text'
      };

      // Add optimistic message to UI
      setMessages(prev => [...prev, optimisticMessage]);

      // Send message to backend
      const newMessage = await messageService.create({
        chatId,
        senderId: currentUserId,
        content,
        type: 'text'
      });

      // Replace optimistic message with real message
      setMessages(prev => prev.map(msg => 
        msg.id === optimisticMessage.id ? newMessage : msg
      ));

      toast.success('Message sent');
    } catch (err) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await messageService.delete(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Message deleted');
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  const handleRetry = () => {
    loadChat();
    loadMessages();
  };

  if (loading) {
    return <Loading type="messages" />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} type="chat-load" />;
  }

  if (!chat) {
    return <Error message="Chat not found" type="chat-load" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      <ChatMessageList
        messages={messages}
        loading={false}
        error={null}
        onRetry={handleRetry}
        onDeleteMessage={handleDeleteMessage}
        currentUserId={currentUserId}
        isTyping={isTyping}
        typingUser={chat.participants?.[0]}
      />
      
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={sendingMessage}
      />
    </motion.div>
  );
};

export default ChatView;