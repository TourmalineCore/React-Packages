import { ChangeEvent } from 'react'

export function Select({
  value,
  options,
  onChange,
  className = '',
  dataCy,
}: {
  value: string | number,
  options: {
    value: string | number,
    label: string,
  }[],
  onChange: (e: ChangeEvent<HTMLSelectElement>) => unknown,
  className?: string,
  dataCy?: string,
}) {
  return (
    <select
      className={`tc-table-select ${className}`}
      data-cy={dataCy}
      value={value}
      onChange={onChange}
    >
      {
        options.map((option) => (
          <option
            key={`select-option-${option.value}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))
      }
    </select>
  )
}
