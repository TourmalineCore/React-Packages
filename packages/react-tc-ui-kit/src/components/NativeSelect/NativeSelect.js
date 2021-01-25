import React from 'react';

import './NativeSelect.css';

export default function NativeSelect({
  style = {},
  className = '',
  value = '',
  options = [],
  onChange = () => {},
  ...props
}) {
  return (
    <select
      style={style}
      className={`tc-native-select ${className}`}
      value={value}
      onChange={handleOptionChange}
      {...props}
    >
      {
        options.map((option) => (
          <option key={`tc-navive-select-option-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))
      }
    </select>
  );

  function handleOptionChange(e) {
    onChange(options.find((option) => `${option.value}` === e.target.value));
  }
}
