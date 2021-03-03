import React, { useState } from 'react';

import { ReactComponent as IconEye } from '../../assets/images/eye.svg';
import { ReactComponent as IconEyeSlash } from '../../assets/images/eye-slash.svg';

import './Input.css';

export default function Input({
  style,
  className = '',
  id,
  type = 'text',
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
  const inputPasswordClassname = type === 'password' ? 'tc-input__control--password' : '';
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
          id={id}
          placeholder={placeholder}
          className={`tc-input__control ${inputPasswordClassname}`}
          type={isPasswordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          {...props}
        />

        {type === 'password' && (
          <button
            className="tc-input__view-toggler"
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
