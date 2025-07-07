import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const ChatListItem = ({ chat, isActive = false }) => {
  const getParticipantName = () => {
    return chat.participants?.[0]?.name || 'Unknown User';
  };

  const getLastMessagePreview = () => {
    if (!chat.lastMessage) return 'No messages yet';
    
    const content = chat.lastMessage.content;
    if (content.length > 50) {
      return content.substring(0, 50) + '...';
    }
    return content;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block"
    >
      <Link to={`/chat/${chat.id}`}>
        <div className={`p-4 rounded-2xl transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-primary/20 to-accent/20 shadow-lg' 
            : 'hover:bg-surface/50'
        }`}>
          <div className="flex items-center space-x-3">
            <Avatar
              src={chat.participants?.[0]?.avatar}
              alt={getParticipantName()}
              status={chat.participants?.[0]?.status}
              size="default"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-text-primary truncate">
                  {getParticipantName()}
                </h3>
                
                <div className="flex items-center space-x-2">
                  {chat.lastMessage && (
                    <span className="text-xs text-text-tertiary">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  )}
                  
                  {chat.unreadCount > 0 && (
                    <Badge variant="default" size="sm">
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <p className="text-sm text-text-secondary truncate flex-1">
                  {getLastMessagePreview()}
                </p>
                
                {chat.lastMessage?.selfDestruct && (
                  <ApperIcon name="Timer" className="w-4 h-4 text-accent flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChatListItem;