/* eslint-disable max-len */
import React, { useState } from 'react';

import './Input.css';

export default function Input({
  style,
  className = '',
  id,
  type = 'text',
  label,
  value,
  placeholder,
  isInvalid = false,
  validationMessages = [],
  isMessagesAbsolute = false,
  onChange = () => { },
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const invalidClassname = isInvalid ? 'tc-input--invalid' : '';
  const inputPasswordClassname = type === 'password' ? 'tc-input__control--password' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'tc-input__errors--absolute' : '';

  return (
    <div className={`tc-input ${className} ${invalidClassname}`} style={style}>
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
            {isPasswordVisible
              ? (
                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.17 15.63a5.52 5.52 0 01-5.43-5.2l-4-3.17c-.52.67-1 1.39-1.39 2.17a1.3 1.3 0 000 1.14 12.18 12.18 0 0010.82 6.93c1.03 0 2.02-.16 2.97-.4l-1.98-1.58c-.32.07-.65.1-.99.1zm11.94 2.26l-4.2-3.33A12.89 12.89 0 0023 10.57a1.29 1.29 0 000-1.14A12.18 12.18 0 0012.17 2.5c-1.95 0-3.88.5-5.6 1.47L1.73.13a.6.6 0 00-.68-.05.61.61 0 00-.18.16l-.74.99a.64.64 0 00.1.88l22.39 17.76a.6.6 0 00.68.05c.06-.04.13-.1.17-.16l.75-.99a.64.64 0 00-.1-.88zm-6.99-5.54l-1.5-1.19A3.8 3.8 0 0014.4 7a3.56 3.56 0 00-3.19-.6c.23.32.36.7.36 1.1l-.06.4-2.8-2.23a5.33 5.33 0 017.34.35 5.63 5.63 0 011.07 6.33z" fill="#172F3D" />
                </svg>
              )
              : (
                <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.86 7.43A12.84 12.84 0 0011.5.5C6.6.5 2.3 3.3.14 7.43a1.24 1.24 0 000 1.14A12.84 12.84 0 0011.5 15.5c4.9 0 9.2-2.8 11.36-6.93a1.24 1.24 0 000-1.14zm-11.36 6.2a5.84 5.84 0 01-3.2-.95 5.51 5.51 0 01-.87-8.65A5.8 5.8 0 0113.7 2.8a5.72 5.72 0 012.58 2.07 5.54 5.54 0 01-2.58 8.33c-.7.28-1.44.43-2.2.43zm0-9.38c-.34 0-.68.05-1.01.15a1.84 1.84 0 01-.19 2.43A1.93 1.93 0 017.82 7a3.66 3.66 0 001.56 4.09 3.89 3.89 0 004.46-.14 3.74 3.74 0 001.29-4.17 3.75 3.75 0 00-1.4-1.84 3.88 3.88 0 00-2.23-.7z" fill="#172F3D" />
                </svg>
              )}
          </button>
        )}
      </div>

      {isInvalid && (
        <ul className={`tc-input__errors ${errorsAbsoluteClassname}`}>
          {validationMessages.map((validationMessage) => (
            <li key={validationMessage}>{validationMessage}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
