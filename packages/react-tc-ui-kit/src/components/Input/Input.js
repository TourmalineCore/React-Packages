import React from 'react';

import './Input.css';

export default function Input({
  style = {},
  id,
  className = '',
  type = 'text',
  value = '',
  placeholder = '',
  disabled,
  onChange,
  ...props
}) {
  return (
    <input
      style={style}
      className={`tc-input ${className}`}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={!!disabled}
      onChange={onChange}
      {...props}
    />
  );
}
