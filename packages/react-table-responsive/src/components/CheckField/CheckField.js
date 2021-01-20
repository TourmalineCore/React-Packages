import React from 'react';

import './CheckField.css';

export default function CheckField({
  className = '',
  label = '',
  disabled = false,
  checked,
  onChange,
}) {
  return (
    <label className={`tc-checkfield ${className}`}>
      <input
        type="checkbox"
        className="tc-checkfield__input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <span className="tc-checkfield__box" />
      <span className="tc-checkfield__label">{label}</span>
    </label>
  );
}
