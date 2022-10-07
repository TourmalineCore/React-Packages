import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import './Button.css';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: ButtonVarieties | string;
  isLoading?: boolean;
}

enum ButtonVarieties {
  primary = 'tc-button--primary',
  secondary = 'tc-button--secondary',
  danger = 'tc-button--danger',
}

export default function Button({
  style = {},
  className = '',
  color = '',
  type = 'button',
  disabled = false,
  isLoading,
  onClick = () => {},
  children,
  ...props
}: ButtonProps) {
  const isLoadingModifier = isLoading ? 'tc-button--loading' : '';
  const colorModifier = ButtonVarieties[color.toLowerCase() as keyof typeof ButtonVarieties] || '';

  return (
    <button
      style={style}
      type={type} // eslint-disable-line
      className={`tc-button ${className} ${colorModifier} ${isLoadingModifier}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span className="tc-button__inner">
        {children}
      </span>

      {isLoading && <span className="tc-button__loader">|||</span>}
    </button>
  );
}
