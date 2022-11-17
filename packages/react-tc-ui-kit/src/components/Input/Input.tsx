import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes, useState,
} from 'react';

import { ReactComponent as IconEye } from '../../assets/images/eye.svg';
import { ReactComponent as IconEyeSlash } from '../../assets/images/eye-slash.svg';

import './Input.css';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  actionButton?: {
    icon: JSX.Element;
    callback: () => unknown;
    buttonProps?: ButtonProps;
  } | null;
  label: string;
  isValid: boolean;
  isInvalid: boolean;
  validationMessages: string[];
  isMessagesAbsolute: boolean;
  viewTogglerIcons: JSX.Element[];
}

export default function Input({
  ref: inputRef,
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
  onChange = () => {},
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [
    viewTogglerIconIdle,
    viewTogglerIconActive,
  ] = viewTogglerIcons;

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
}
