import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import './CheckField.css';

interface CheckFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  viewType?: 'checkbox' | 'radio';
  type?: 'checkbox';
}

export default function CheckField({
  style = {},
  className = '',
  viewType = 'checkbox',
  type = 'checkbox',
  label,
  disabled = false,
  checked,
  onChange,
  ...props
}: CheckFieldProps) {
  const viewTypeClassName = viewType === 'radio' ? 'tc-checkfield__box--radio' : '';

  return (
    <label style={style} className={`tc-checkfield ${className}`}>
      <input
        type={type}
        className="tc-checkfield__input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={`tc-checkfield__box ${viewTypeClassName}`} />

      {label && (
        <span className="tc-checkfield__label">{label}</span>
      )}
    </label>
  );
}
