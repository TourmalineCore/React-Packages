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
  actionButton,
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

  const [
    viewTogglerIconIdle,
    viewTogglerIconActive,
  ] = viewTogglerIcons;

  const processedActionButton = getProcessedActionButton();

  const validClassname = isValid ? 'tc-input--valid' : '';
  const invalidClassname = isInvalid ? 'tc-input--invalid' : '';
  const inputWithActionClassname = processedActionButton ? 'tc-input__control--with-action' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'tc-input__errors--absolute' : '';

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
          className={`tc-input__control ${inputWithActionClassname}`}
          type={isPasswordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          {...props}
        />

        {processedActionButton && (
          <button
            className="tc-input__action-button"
            type="button"
            onClick={processedActionButton.callback}
            {...processedActionButton.buttonProps}
          >
            {processedActionButton.icon}
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

  function getProcessedActionButton() {
    if (type === 'password') {
      return {
        icon: isPasswordVisible ? viewTogglerIconActive : viewTogglerIconIdle,
        callback: () => setIsPasswordVisible(!isPasswordVisible),
        buttonProps: {},
      };
    }

    if (!actionButton) {
      return null;
    }

    return actionButton;
  }
}
