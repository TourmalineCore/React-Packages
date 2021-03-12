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
        options.map(({
          value: optionValue,
          label: optionLabel,
          ...optionProps
        }) => (
          <option key={`tc-navive-select-option-${optionValue}`} value={optionValue} {...optionProps}>
            {optionLabel}
          </option>
        ))
      }
    </select>
  );

  function handleOptionChange(e) {
    onChange(
      options.find((option) => `${option.value}` === e.target.value),
      e,
    );
  }
}
