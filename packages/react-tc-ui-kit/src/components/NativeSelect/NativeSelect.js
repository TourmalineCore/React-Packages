import React from 'react';

import './NativeSelect.css';

export default function NativeSelect({
  style = {},
  className = '',
  label,
  id,
  value = '',
  options = [],
  onChange = () => { },
  ...props
}) {
  return (
    <div className="tc-native-select">
      {label && (
        <label className="tc-native-select__label" htmlFor={id}>{label}</label>
      )}
      <select
        style={style}
        id={id}
        className={`tc-native-select__control ${className}`}
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
    </div>
  );

  function handleOptionChange(e) {
    onChange(
      options.find((option) => `${option.value}` === e.target.value),
      e,
    );
  }
}
