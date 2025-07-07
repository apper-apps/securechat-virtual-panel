import { motion } from 'framer-motion';
import ContactListComponent from '@/components/organisms/ContactList';

const ContactList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <ContactListComponent />
    </motion.div>
  );
};

export default ContactList;