import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import SearchBar from '@/components/molecules/SearchBar';
import ChatListItem from '@/components/molecules/ChatListItem';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { chatService } from '@/services/api/chatService';

const ChatList = ({ onSelectChat }) => {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadChats = async () => {
    try {
      setLoading(true);
      setError(null);
      const chatData = await chatService.getAll();
      setChats(chatData);
      setFilteredChats(chatData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat =>
        chat.participants?.some(participant =>
          participant.name.toLowerCase().includes(term.toLowerCase())
        ) || chat.lastMessage?.content.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  };

  if (loading) {
    return <Loading type="chat-list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadChats} type="chat-load" />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-text-tertiary/20">
        <SearchBar onSearch={handleSearch} placeholder="Search chats..." />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <Empty 
            type={searchTerm ? 'search' : 'chats'}
            onAction={() => {
              if (searchTerm) {
                handleSearch('');
              } else {
                // Navigate to contacts
                window.location.href = '/contacts';
              }
            }}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 space-y-2"
          >
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChatListItem 
                  chat={chat} 
                  isActive={chat.id === chatId}
                  onClick={() => onSelectChat && onSelectChat(chat)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatList;