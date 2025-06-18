import { HeaderGroup, flexRender } from '@tanstack/react-table'
import { getStyles, setActionCellClassName } from '../../helpers'

export function DesktopFooter<TData>({
  footerGroups,
}: {
  footerGroups: HeaderGroup<TData>[],
}) {
  return (
    footerGroups.map((footerGroup) => (
      <div
        key={`footer-group-${footerGroup.id}`}
        className="tc-table-desktop-row tc-table-desktop-row--footer"
        data-cy="table-footer"
      >
        {footerGroup.headers.map((header) => (
          <div
            key={header.id}
            className={`tc-table-desktop-cell ${setActionCellClassName(header.column)}`}
            {...getStyles({
              width: header.getSize(),
            })}
          >
            {header.isPlaceholder
              ? null
              : flexRender(
                header.column.columnDef.footer,
                header.getContext(),
              )}
          </div>
        ))}
      </div>
    ))
  )
}
