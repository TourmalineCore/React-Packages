import { Column } from '@tanstack/table-core'
import { Select } from '../../Select/Select'

export function SelectColumnFilter<TData>({
  column,
  filterValueOverride,
  setFilterOverride,
}: {
  column: Column<TData, unknown>,
  filterValueOverride?: string | number,
  setFilterOverride?: (id: string, value: string) => unknown,
}) {
  const columnFilterValue = column.getFilterValue()

  return (
    <Select
      value={(setFilterOverride ? filterValueOverride : columnFilterValue) as string | number}
      dataCy={`table-select-${column.id}`}
      options={column.columnDef.tcSelectFilterOptions ?? []}
      onChange={(e) => {
        if (setFilterOverride) {
          setFilterOverride(column.id, e.target.value)
        } else {
          column.setFilterValue(e.target.value)
        }
      }}
    />
  )
}
