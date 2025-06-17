import { HeaderGroup, flexRender } from '@tanstack/react-table'
import { getStyles } from '../../../../helpers'

export function DesktopFilters<TData>({
  headerGroup,
}: {
  headerGroup: HeaderGroup<TData>,
}) {
  return (
    <div
      key="filters-row"
      className="tc-table-desktop-row tc-table-desktop-row--filter"
    >
      {headerGroup
        .headers
        .map((header) => (
          <div
            key={header.id}
            className="tc-table-desktop-header-cell"
            {...getStyles({
              width: header.getSize(),
            })}
          >
            <div>
              {
                header.column.getCanFilter()
                  ? flexRender(
                    header.column.columnDef.tcFilter,
                    {
                      ...header.getContext(),
                      ...header.column.columnDef.tcInputFilterProps,
                    },
                  )
                  : null
              }
            </div>
          </div>
        ))}
    </div>
  )
}
