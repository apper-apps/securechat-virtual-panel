import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-surface/50 backdrop-blur-sm border-t border-text-tertiary/20">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-background border border-text-tertiary/30 rounded-2xl px-4 py-3 text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
            disabled={disabled}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-full hover:bg-surface"
            disabled={disabled}
          >
            <ApperIcon name="Paperclip" className="w-5 h-5 text-text-secondary" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-full hover:bg-surface"
            disabled={disabled}
          >
            <ApperIcon name="Smile" className="w-5 h-5 text-text-secondary" />
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              className="w-10 h-10 p-0 rounded-full"
              disabled={!message.trim() || disabled}
            >
              <ApperIcon name="Send" className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;