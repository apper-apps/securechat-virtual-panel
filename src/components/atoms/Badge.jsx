import { cn } from '@/utils/cn';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className,
  ...props 
}) => {
  const variants = {
    default: 'bg-primary text-white',
    secondary: 'bg-surface text-text-primary',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    outline: 'border border-text-tertiary/30 text-text-primary',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;