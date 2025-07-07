import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  type = 'default',
  onAction,
  actionText = 'Get Started'
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'chats':
        return {
          icon: 'MessageCircle',
          title: 'No Chats Yet',
          description: 'Start a conversation by selecting a contact or creating a new chat.',
          actionText: 'Browse Contacts',
        };
      case 'messages':
        return {
          icon: 'MessageSquare',
          title: 'No Messages',
          description: 'Send your first message to start the conversation.',
          actionText: 'Send Message',
        };
      case 'contacts':
        return {
          icon: 'Users',
          title: 'No Contacts',
          description: 'Add contacts to start secure conversations.',
          actionText: 'Add Contact',
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'Try adjusting your search terms or browse all chats.',
          actionText: 'Clear Search',
        };
      default:
        return {
          icon: 'Inbox',
          title: 'Nothing Here',
          description: 'This area is empty. Start by adding some content.',
          actionText: actionText,
        };
    }
  };

  const emptyContent = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={emptyContent.icon} className="w-12 h-12 text-primary" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-text-primary mb-3"
      >
        {emptyContent.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary mb-8 max-w-md leading-relaxed"
      >
        {emptyContent.description}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={onAction}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            {emptyContent.actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;