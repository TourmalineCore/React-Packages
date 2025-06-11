import { Column } from '@tanstack/table-core'
import { InputHTMLAttributes } from 'react'

export function DefaultColumnFilter<TData>({
  column,
  className = '',
  filterValueOverride,
  setFilterOverride,
  ...props
}: {
  column: Column<TData, unknown>,
  className?: string,
  filterValueOverride?: string,
  setFilterOverride?: (id: string, value: string) => unknown,
} & InputHTMLAttributes<HTMLInputElement>) {
  const columnFilterValue = column.getFilterValue()

  return (
    <input
      className={`tc-table-filter-input ${className}`}
      data-cy={`table-filter-input-${column.id}`}
      type="text"
      value={
        setFilterOverride
          ? filterValueOverride ?? ''
          : (columnFilterValue ?? '') as string
      }
      onChange={(e) => {
        if (setFilterOverride) {
          setFilterOverride(column.id, e.target.value)
        } else {
          column.setFilterValue(e.target.value)
        }
      }}
      style={{
        width: '100%',
        lineHeight: 1,
      }}
      {...props}
    />
  )
}
