import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationTabs from '@/components/organisms/NavigationTabs';
import Header from '@/components/organisms/Header';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Chats';
      case '/contacts':
        return 'Contacts';
      case '/settings':
        return 'Settings';
      default:
        if (location.pathname.startsWith('/chat/')) {
          return 'Chat';
        }
        return 'SecureChat';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Desktop Sidebar */}
        <div className="w-80 bg-surface/30 backdrop-blur-sm border-r border-text-tertiary/20 flex flex-col">
          <Header title="SecureChat" />
          <div className="flex-1 overflow-hidden">
            <NavigationTabs />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={getPageTitle()} showBackButton={location.pathname.startsWith('/chat/')} />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="bg-surface/50 backdrop-blur-sm border-b border-text-tertiary/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-text-primary">
              {getPageTitle()}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <ApperIcon name="Menu" className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-surface/95 backdrop-blur-sm border-r border-text-tertiary/20 z-50 flex flex-col"
              >
                <div className="p-4 border-b border-text-tertiary/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-text-primary">SecureChat</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2"
                    >
                      <ApperIcon name="X" className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <NavigationTabs onNavigate={() => setIsMobileMenuOpen(false)} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;