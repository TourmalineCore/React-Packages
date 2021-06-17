import React, { useState } from 'react';

import { ReactComponent as IconEye } from '../../assets/images/eye.svg';
import { ReactComponent as IconEyeSlash } from '../../assets/images/eye-slash.svg';

import './Input.css';

export default function Input({
  inputRef,
  style,
  className = '',
  id,
  type = 'text',
  actionButton = {
    icon: null,
    callback: () => {},
  },
  label,
  value,
  placeholder,
  isValid,
  isInvalid = false,
  validationMessages = [],
  isMessagesAbsolute = false,
  viewTogglerIcons = [<IconEye />, <IconEyeSlash />],
  onChange = () => { },
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validClassname = isValid ? 'tc-input--valid' : '';
  const invalidClassname = isInvalid ? 'tc-input--invalid' : '';
  const inputButtonClassname = type === 'password' || actionButton ? 'tc-input__control--button' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'tc-input__errors--absolute' : '';

  const [
    viewTogglerIconIdle,
    viewTogglerIconActive,
  ] = viewTogglerIcons;

  return (
    <div
      style={style}
      className={`tc-input ${className} ${invalidClassname} ${validClassname}`}
    >
      {label && (
        <label className="tc-input__label" htmlFor={id}>{label}</label>
      )}

      <div className="tc-input__box">
        <input
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          className={`tc-input__control ${inputButtonClassname}`}
          type={isPasswordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          {...props}
        />

        {type !== 'password' && actionButton && (
          <button
            className="tc-input__action-button"
            type="button"
            onClick={actionButton.callback}
          >
            {actionButton.icon}
          </button>
        )}

        {type === 'password' && (
          <button
            className="tc-input__action-button"
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? viewTogglerIconActive : viewTogglerIconIdle}
          </button>
        )}
      </div>

      {isInvalid && validationMessages.length && (
        <ul className={`tc-input__errors ${errorsAbsoluteClassname}`}>
          {validationMessages.map((validationMessage) => (
            <li key={validationMessage}>{validationMessage}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
