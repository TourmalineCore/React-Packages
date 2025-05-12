import React, { useEffect, useRef } from 'react';

import './Textarea.css';

const DEFAULT_TEXTAREA_HEIGHT = 120;

export default function Textarea({
  inputRef,
  style,
  id,
  className = '',
  label,
  disabled,
  value = '',
  maxLength,
  autoSize = false,
  placeholder,
  isValid,
  isInvalid = false,
  validationMessages = [],
  isMessagesAbsolute = false,
  onChange = () => {},
  ...props
}) {
  const textareaRef = inputRef || useRef();

  useEffect(() => {
    handleResize(textareaRef.current);
  }, []);

  const validClassname = isValid ? 'tc-textarea--valid' : '';
  const invalidClassname = isInvalid ? 'tc-textarea--invalid' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'tc-textarea__errors--absolute' : '';
  const autosizeClassname = autoSize ? 'tc-textarea__control--autosize' : '';

  return (
    <div
      style={style}
      className={`tc-textarea ${className} ${invalidClassname} ${validClassname}`}
    >
      {label && (
        <label className="tc-textarea__label" htmlFor={id}>{label}</label>
      )}

      <div className="tc-textarea__box">
        <textarea
          ref={textareaRef}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          className={`tc-textarea__control ${className} ${autosizeClassname}`}
          value={value}
          onChange={handleChange}
          {...props}
        />

        {maxLength && (
          <div className="tc-textarea__control-counter">
            {value ? value.length : 0}
            {' '}
            /
            {' '}
            {maxLength}
          </div>
        )}
      </div>

      {isInvalid && validationMessages.length && (
        <ul className={`tc-textarea__errors ${errorsAbsoluteClassname}`}>
          {validationMessages.map((validationMessage) => (
            <li key={validationMessage}>{validationMessage}</li>
          ))}
        </ul>
      )}
    </div>
  );

  function handleChange(e) {
    handleResize(e.target);
    onChange(e);
  }

  function handleResize(target) {
    if (!autoSize) {
      return;
    }

    target.style.height = '';

    const { scrollHeight } = target;

    target.style.height = `${Math.max(scrollHeight, DEFAULT_TEXTAREA_HEIGHT)}px`;
  }
}
