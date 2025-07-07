import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/services/auth/AuthContext';
import { backupService } from '@/services/api/backupService';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const settingsCategories = [
    {
      title: 'Privacy & Security',
      items: [
        { icon: 'Lock', label: 'End-to-End Encryption', description: 'All messages are encrypted', action: 'enabled' },
        { icon: 'Timer', label: 'Self-Destructing Messages', description: 'Configure default timer', action: 'configure' },
        { icon: 'Shield', label: 'Two-Factor Authentication', description: user?.twoFactorEnabled ? 'Enabled' : 'Add extra security', action: user?.twoFactorEnabled ? 'enabled' : 'setup' },
        { icon: 'Eye', label: 'Screen Security', description: 'Prevent screenshots', action: 'toggle' },
        { icon: 'Smartphone', label: 'Device Management', description: 'Manage connected devices', action: 'manage-devices' },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { icon: 'Bell', label: 'Push Notifications', description: 'Receive message alerts', action: 'toggle' },
        { icon: 'Volume2', label: 'Notification Sounds', description: 'Customize alert sounds', action: 'configure' },
        { icon: 'Moon', label: 'Quiet Hours', description: 'Disable notifications during set times', action: 'configure' },
      ]
    },
{
      title: 'Chat Settings',
      items: [
        { icon: 'Palette', label: 'Themes', description: 'Customize app appearance', action: 'configure' },
        { icon: 'Download', label: 'Auto-Download Media', description: 'Automatically download images/videos', action: 'toggle' },
        { icon: 'Archive', label: 'Chat Backup', description: 'Backup conversations to cloud', action: 'backup' },
        { icon: 'Users', label: 'Group Chats', description: 'Manage group chat settings', action: 'configure' },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: 'User', label: 'Profile', description: 'Edit your profile information', action: 'edit' },
        { icon: 'Users', label: 'Blocked Users', description: 'Manage blocked contacts', action: 'manage' },
        { icon: 'Trash2', label: 'Delete Account', description: 'Permanently delete your account', action: 'danger' },
{ icon: 'LogOut', label: 'Sign Out', description: 'Sign out of your account', action: 'logout' },
      ]
    }
  ];
const handleSettingClick = async (item) => {
    switch (item.action) {
      case 'enabled':
        if (item.label === 'Two-Factor Authentication') {
          toast.info('Two-factor authentication is already enabled');
        } else {
          toast.info('End-to-end encryption is always enabled');
        }
        break;
      case 'setup':
        if (item.label === 'Two-Factor Authentication') {
          navigate('/2fa-setup');
        } else {
          toast.info(`${item.label} setup will be available soon`);
        }
        break;
      case 'backup':
        try {
          toast.info('Creating backup...');
          await backupService.createBackup({
            type: 'full',
            chatCount: 10,
            messageCount: 150
          });
          toast.success('Backup created successfully');
        } catch (err) {
          toast.error('Failed to create backup');
        }
        break;
      case 'manage-devices':
        toast.info('Device management coming soon');
        break;
      case 'logout':
        if (confirm('Are you sure you want to sign out?')) {
          await logout();
        }
        break;
      case 'configure':
        toast.info(`${item.label} configuration coming soon`);
        break;
      case 'toggle':
        toast.success(`${item.label} toggled`);
        break;
      case 'edit':
        toast.info('Profile editing coming soon');
        break;
      case 'manage':
        toast.info('Blocked users management coming soon');
        break;
      case 'danger':
        toast.warning('Account deletion requires confirmation');
        break;
      default:
        toast.info('Feature coming soon');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-y-auto"
    >
      <div className="p-6 space-y-8">
        {settingsCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-text-primary">
              {category.title}
            </h2>
            
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-surface/30 hover:bg-surface/50 transition-all duration-200 cursor-pointer"
                  onClick={() => handleSettingClick(item)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.action === 'danger' 
                        ? 'bg-error/20 text-error' 
                        : item.action === 'enabled'
                        ? 'bg-success/20 text-success'
                        : 'bg-primary/20 text-primary'
                    }`}>
                      <ApperIcon name={item.icon} className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">
                        {item.label}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      {item.action === 'enabled' && (
                        <div className="w-2 h-2 bg-success rounded-full" />
                      )}
                      {item.action !== 'enabled' && (
                        <ApperIcon name="ChevronRight" className="w-5 h-5 text-text-tertiary" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        
        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-text-tertiary/20"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              SecureChat
            </h3>
            <p className="text-text-secondary">
              Version 1.0.0
            </p>
            <p className="text-sm text-text-tertiary">
              Privacy-focused messaging with end-to-end encryption
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;