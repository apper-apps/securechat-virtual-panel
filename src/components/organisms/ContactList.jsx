import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBar from '@/components/molecules/SearchBar';
import ContactListItem from '@/components/molecules/ContactListItem';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { contactService } from '@/services/api/contactService';
import { chatService } from '@/services/api/chatService';

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const contactData = await contactService.getAll();
      setContacts(contactData);
      setFilteredContacts(contactData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleStartChat = async (contact) => {
    try {
      // Create or find existing chat
      const newChat = await chatService.create({
        participants: [contact.id],
        type: 'private'
      });
      
      toast.success(`Started chat with ${contact.name}`);
      navigate(`/chat/${newChat.id}`);
    } catch (err) {
      toast.error('Failed to start chat');
    }
  };

  if (loading) {
    return <Loading type="chat-list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContacts} type="network" />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-text-tertiary/20">
        <SearchBar onSearch={handleSearch} placeholder="Search contacts..." />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <Empty 
            type={searchTerm ? 'search' : 'contacts'}
            onAction={() => {
              if (searchTerm) {
                handleSearch('');
              } else {
                toast.info('Contact addition feature coming soon!');
              }
            }}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 space-y-3"
          >
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ContactListItem 
                  contact={contact} 
                  onStartChat={handleStartChat}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactList;