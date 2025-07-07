import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const NavigationTabs = ({ onNavigate }) => {
  const tabs = [
    {
      path: '/',
      label: 'Chats',
      icon: 'MessageCircle',
    },
    {
      path: '/contacts',
      label: 'Contacts',
      icon: 'Users',
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: 'Settings',
    },
  ];

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg'
                  : 'text-text-secondary hover:bg-surface/50 hover:text-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 w-full"
              >
                <ApperIcon 
                  name={tab.icon} 
                  className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-current'}`} 
                />
                <span className="font-medium">{tab.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTabs;