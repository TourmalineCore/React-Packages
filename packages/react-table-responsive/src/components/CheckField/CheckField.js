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
    <label className={`tc-table-checkfield ${className}`}>
      <input
        type="checkbox"
        className="tc-table-checkfield__input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <span className="tc-table-checkfield__box" />
      <span className="tc-table-checkfield__label">{label}</span>
    </label>
  );
}
