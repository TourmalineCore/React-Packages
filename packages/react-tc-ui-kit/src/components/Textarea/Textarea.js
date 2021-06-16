import './Textarea.css';

export default function Textarea({
  style = {},
  className = '',
  value = '',
  label,
  id,
  placeholder,
  disabled,
  isValid,
  isInvalid = false,
  validationMessages = [],
  isMessagesAbsolute = false,
  onChange = () => {},
  ...props
}) {
  const validClassname = isValid ? 'tc-textarea--valid' : '';
  const invalidClassname = isInvalid ? 'tc-textarea--invalid' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'tc-textarea__errors--absolute' : '';

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
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={`tc-textarea__control ${className}`}
          value={value}
          onChange={onChange}
          {...props}
        />
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
}
