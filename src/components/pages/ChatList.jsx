import { motion } from 'framer-motion';
import ChatListComponent from '@/components/organisms/ChatList';

const ChatList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <ChatListComponent />
    </motion.div>
  );
};

export default ChatList;