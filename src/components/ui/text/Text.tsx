import React from 'react';
import './Text.css';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body';

interface TextProps {
  variant: TextVariant;
  children: React.ReactNode;
  className?: string;
}

export const Text = ({ variant, children, className = '' }: TextProps) => {
  const baseClasses = 'text-base';
  
  const variantClasses = {
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    body: 'text-body'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  switch (variant) {
    case 'h1':
      return <h1 className={combinedClasses}>{children}</h1>;
    case 'h2':
      return <h2 className={combinedClasses}>{children}</h2>;
    case 'h3':
      return <h3 className={combinedClasses}>{children}</h3>;
    case 'body':
    default:
      return <p className={combinedClasses}>{children}</p>;
  }
};
