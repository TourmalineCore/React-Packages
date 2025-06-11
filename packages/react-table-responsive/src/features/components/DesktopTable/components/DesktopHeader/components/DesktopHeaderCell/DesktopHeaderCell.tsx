import { Header, flexRender } from '@tanstack/react-table'
import { getStyles, setActionCellClassName } from '../../../../helpers'

export function DesktopHeaderCell<TData>({
  headerCell,
}: {
  headerCell: Header<TData, unknown>,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      title={headerCell.column.id}
      {...getStyles({
        width: headerCell.getSize(),
      })}
      className={`
        tc-table-desktop-header-cell tc-table-desktop-header-cell--title 
        ${setActionCellClassName(headerCell.column)}
        ${setSortingClassName()}
      `}
      onClick={headerCell.column.getToggleSortingHandler()}
    >
      {headerCell.isPlaceholder
        ? null
        : flexRender(
          headerCell.column.columnDef.header,
          headerCell.getContext(),
        )}
    </div>
  )

  function setSortingClassName() {
    const columnIsSorted = headerCell.column.getIsSorted()

    // eslint-disable-next-line no-nested-ternary
    return columnIsSorted
      ? columnIsSorted === 'desc'
        ? 'tc-table-desktop-header-cell--sort-desc'
        : 'tc-table-desktop-header-cell--sort-asc'
      : ''
  }
}
