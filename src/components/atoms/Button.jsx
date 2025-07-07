import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg',
    secondary: 'bg-surface hover:bg-surface/80 text-text-primary border border-text-tertiary/30',
    ghost: 'hover:bg-surface/50 text-text-primary',
    danger: 'bg-error hover:bg-error/90 text-white shadow-lg',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;