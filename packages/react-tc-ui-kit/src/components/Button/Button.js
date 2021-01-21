import React from 'react';

import './Button.css';

const buttonViewTypes = {
  simple: 'tc-button--simple',
  cancel: 'tc-button--cancel',
};

export default function Button({
  style = {},
  type = 'button',
  className = '',
  disabled = false,
  onClick = () => {},
  children,
  ...props
}) {
  // filter out viewType keys
  // because we should not set boolean view modifiers directly to dom node
  const filteredProps = Object.entries(props)
    .filter(([propKey]) => !buttonViewTypes[propKey])
    .reduce((acc, [propKey, propValue]) => ({
      ...acc,
      [propKey]: propValue,
    }), {});

  return (
    <button
      style={style}
      type={type} // eslint-disable-line
      className={`tc-button ${className} ${getButtonModifiers(props)}`}
      disabled={disabled}
      onClick={onClick}
      {...filteredProps}
    >
      {children}
    </button>
  );
}

function getButtonModifiers(props) {
  return Object.entries(buttonViewTypes)
    .filter(([key]) => props[key])
    .map(([, className]) => className)
    .join(' ');
}
