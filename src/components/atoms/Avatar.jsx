import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Avatar = ({ 
  src, 
  alt, 
  size = 'default', 
  status,
  className,
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    default: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const statusColors = {
    online: 'bg-online',
    offline: 'bg-offline',
    away: 'bg-warning',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    default: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  return (
    <div className={cn('relative', className)} {...props}>
      <div className={cn(
        'rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden',
        sizes[size]
      )}>
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
        ) : (
          <ApperIcon 
            name="User" 
            className={cn(
              'text-text-secondary',
              size === 'sm' && 'w-4 h-4',
              size === 'default' && 'w-6 h-6',
              size === 'lg' && 'w-8 h-8',
              size === 'xl' && 'w-10 h-10'
            )}
          />
        )}
      </div>
      
      {status && (
        <div className={cn(
          'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background',
          statusColors[status] || statusColors.offline,
          statusSizes[size]
        )} />
      )}
    </div>
  );
};

export default Avatar;