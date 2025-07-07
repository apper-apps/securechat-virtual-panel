import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = 'default' 
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Lost',
          description: 'Please check your internet connection and try again.',
        };
      case 'message-failed':
        return {
          icon: 'MessageCircleX',
          title: 'Message Failed',
          description: 'Your message could not be delivered. Please try again.',
        };
      case 'chat-load':
        return {
          icon: 'MessageSquareX',
          title: 'Chat Unavailable',
          description: 'Unable to load chat messages. Please try again.',
        };
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Error',
          description: message,
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={errorContent.icon} className="w-10 h-10 text-error" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-text-primary mb-2"
      >
        {errorContent.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary mb-6 max-w-md"
      >
        {errorContent.description}
      </motion.p>
      
      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Error;