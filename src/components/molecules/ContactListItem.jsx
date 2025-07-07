import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { formatDistanceToNow } from 'date-fns';

const ContactListItem = ({ contact, onStartChat }) => {
  const formatLastSeen = (timestamp) => {
    if (!timestamp) return 'Never';
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-2xl bg-surface/30 hover:bg-surface/50 transition-all duration-200"
    >
      <div className="flex items-center space-x-4">
        <Avatar
          src={contact.avatar}
          alt={contact.name}
          status={contact.status}
          size="default"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary truncate">
            {contact.name}
          </h3>
          <p className="text-sm text-text-secondary">
            {contact.status === 'online' ? 'Online' : `Last seen ${formatLastSeen(contact.lastSeen)}`}
          </p>
        </div>
        
        <Button
          onClick={() => onStartChat(contact)}
          variant="ghost"
          size="sm"
          className="hover:bg-primary/20 hover:text-primary"
        >
          <ApperIcon name="MessageCircle" className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactListItem;