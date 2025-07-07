import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import SelfDestructTimer from '@/components/molecules/SelfDestructTimer';

const MessageBubble = ({ message, isOwnMessage, onDelete }) => {
  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <ApperIcon name="Clock" className="w-3 h-3 text-text-tertiary" />;
      case 'sent':
        return <ApperIcon name="Check" className="w-3 h-3 text-text-secondary" />;
      case 'delivered':
        return <ApperIcon name="CheckCheck" className="w-3 h-3 text-text-secondary" />;
      case 'read':
        return <ApperIcon name="CheckCheck" className="w-3 h-3 text-accent" />;
      case 'failed':
        return <ApperIcon name="X" className="w-3 h-3 text-error" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-3 rounded-2xl message-bubble ${
            isOwnMessage
              ? 'bg-gradient-to-br from-message-sent to-message-sent/80 text-white'
              : 'bg-gradient-to-br from-message-received to-message-received/80 text-text-primary'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {message.selfDestruct && (
            <div className="mt-2 pt-2 border-t border-white/20">
              <SelfDestructTimer
                duration={message.selfDestruct}
                onExpire={() => onDelete && onDelete(message.id)}
              />
            </div>
          )}
        </div>
        
        <div className={`flex items-center space-x-1 mt-1 px-1 ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-text-tertiary">
            {formatTime(message.timestamp)}
          </span>
          {isOwnMessage && (
            <div className="flex items-center">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;