import React from 'react';

import './Button.css';

const buttonColors = {
  primary: 'tc-button--primary',
  secondary: 'tc-button--secondary',
  danger: 'tc-button--danger',
};

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
}) {
  const isLoadingModifier = isLoading ? 'tc-button--loading' : '';
  const colorModifier = buttonColors[color] || '';

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
