'use client';

import { motion } from 'framer-motion';
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'ghost' 
  | 'outline' 
  | 'glass'
  | 'minimal';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animate?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'children'> {
  href?: never;
  external?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const getVariantStyles = (variant: ButtonVariant, disabled: boolean) => {
  const base = "font-light tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  if (disabled) {
    return `${base} opacity-50 cursor-not-allowed`;
  }

  switch (variant) {
    case 'primary':
      return `${base} bg-gray-900 text-white hover:bg-gray-800 focus:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-900`;
    
    case 'secondary':
      return `${base} bg-white text-gray-900 hover:bg-gray-50 focus:bg-gray-100 focus:ring-gray-500 border border-gray-200`;
    
    case 'ghost':
      return `${base} bg-transparent text-white hover:bg-white/10 focus:bg-white/20 focus:ring-white/50 focus:ring-offset-transparent`;
    
    case 'outline':
      return `${base} bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus:bg-white/20 focus:ring-white/50 focus:ring-offset-transparent`;
    
    case 'glass':
      return `${base} bg-black/20 backdrop-blur-[2px] text-white hover:bg-black/30 focus:bg-black/40 focus:ring-white/50 focus:ring-offset-transparent border border-white/10`;
    
    case 'minimal':
      return `${base} bg-transparent text-white/80 hover:text-white hover:bg-white/5 focus:bg-white/10 focus:ring-white/30 focus:ring-offset-transparent`;
    
    default:
      return `${base} bg-gray-900 text-white hover:bg-gray-800 focus:bg-gray-700 focus:ring-gray-500`;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return 'px-4 py-2 text-sm rounded-md min-h-[36px]';
    case 'md':
      return 'px-6 py-3 text-sm rounded-md min-h-[44px]';
    case 'lg':
      return 'px-8 py-4 text-base rounded-lg min-h-[48px]';
    case 'xl':
      return 'px-10 py-5 text-lg rounded-lg min-h-[56px]';
    default:
      return 'px-6 py-3 text-sm rounded-md min-h-[44px]';
  }
};

const ButtonComponent = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    animate = true,
    ...props
  }, ref) => {
    const variantStyles = getVariantStyles(variant, disabled || loading);
    const sizeStyles = getSizeStyles(size);
    const widthStyles = fullWidth ? 'w-full' : 'inline-flex';
    
    const buttonClasses = `
      ${variantStyles}
      ${sizeStyles}
      ${widthStyles}
      ${className}
      items-center justify-center
      relative overflow-hidden
      select-none
    `.trim();

    const content = (
      <>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-inherit"
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        <span className={`flex items-center space-x-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
        </span>
      </>
    );

    // Link variant
    if ('href' in props && props.href) {
      const linkProps = props as ButtonAsLinkProps;
      
      if (linkProps.external) {
        return (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={linkProps.href}
            className={buttonClasses}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={animate ? { scale: 1.02 } : undefined}
            whileTap={animate ? { scale: 0.98 } : undefined}
            {...(disabled && { 'aria-disabled': true, tabIndex: -1 })}
          >
            {content}
          </motion.a>
        );
      }

      return (
        <Link href={linkProps.href}>
          <motion.div
            ref={ref as React.Ref<HTMLDivElement>}
            className={buttonClasses}
            whileHover={animate ? { scale: 1.02 } : undefined}
            whileTap={animate ? { scale: 0.98 } : undefined}
            {...(disabled && { 'aria-disabled': true, tabIndex: -1 })}
          >
            {content}
          </motion.div>
        </Link>
      );
    }

    // Button variant
    const buttonProps = props as ButtonAsButtonProps;
    const { 
      type, 
      onClick, 
      onBlur, 
      onFocus, 
      onMouseEnter, 
      onMouseLeave, 
      'aria-label': ariaLabel, 
      'aria-describedby': ariaDescribedBy,
      id,
      name,
      value,
      form,
      tabIndex
    } = buttonProps;
    
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClasses}
        disabled={disabled || loading}
        whileHover={animate && !disabled && !loading ? { scale: 1.02 } : undefined}
        whileTap={animate && !disabled && !loading ? { scale: 0.98 } : undefined}
        type={type}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        id={id}
        name={name}
        value={value}
        form={form}
        tabIndex={tabIndex}
      >
        {content}
      </motion.button>
    );
  }
);

ButtonComponent.displayName = 'Button';

// Export both the main component and specific variants for convenience
export default ButtonComponent;

// Convenience components for common use cases
export const PrimaryButton = (props: ButtonProps) => (
  <ButtonComponent variant="primary" {...props} />
);

export const SecondaryButton = (props: ButtonProps) => (
  <ButtonComponent variant="secondary" {...props} />
);

export const GhostButton = (props: ButtonProps) => (
  <ButtonComponent variant="ghost" {...props} />
);

export const OutlineButton = (props: ButtonProps) => (
  <ButtonComponent variant="outline" {...props} />
);

export const GlassButton = (props: ButtonProps) => (
  <ButtonComponent variant="glass" {...props} />
);

export const MinimalButton = (props: ButtonProps) => (
  <ButtonComponent variant="minimal" {...props} />
);

// Icon-specific convenience components  
export const IconButton = ({ 
  icon, 
  'aria-label': ariaLabel, 
  size = 'md',
  variant = 'ghost',
  ...props 
}: (Omit<ButtonAsButtonProps, 'children'> | Omit<ButtonAsLinkProps, 'children'>) & { 
  icon: ReactNode; 
  'aria-label': string;
}) => (
  <ButtonComponent
    variant={variant}
    size={size}
    aria-label={ariaLabel}
    className="!p-2 !min-h-[44px] !min-w-[44px] aspect-square"
    {...props}
  >
    {icon}
  </ButtonComponent>
);

export const Button = ButtonComponent;