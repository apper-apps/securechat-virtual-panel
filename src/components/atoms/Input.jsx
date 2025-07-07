import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  className, 
  type = 'text',
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          'custom-input w-full',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;