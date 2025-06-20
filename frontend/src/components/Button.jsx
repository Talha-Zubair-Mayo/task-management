import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:opacity-90 hover:scale-[1.03]';
  const variants = {
    primary:
      'text-white bg-indigo-600 hover:bg-indigo-700 border-transparent focus:ring-indigo-500',
    secondary:
      'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-indigo-500',
    danger:
      'text-white bg-red-600 hover:bg-red-700 border-transparent focus:ring-red-500',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
