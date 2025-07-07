import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '../../App';

const Header = ({ title, showBackButton = false, actions = [] }) => {
  const navigate = useNavigate();
  const authMethods = useContext(AuthContext);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-sm border-b border-text-tertiary/20 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-text-primary">
            {title}
          </h1>
        </div>
<div className="flex items-center space-x-2">
          {actions.length > 0 && actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={action.onClick}
              className="p-2"
            >
              <ApperIcon name={action.icon} className="w-5 h-5" />
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={authMethods?.logout}
            className="p-2"
            title="Logout"
          >
            <ApperIcon name="LogOut" className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;