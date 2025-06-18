import { Row, flexRender } from '@tanstack/react-table'
import { NoRecords } from '../../../../../components/NoRecords/NoRecords'
import { getStyles, setActionCellClassName } from '../../helpers'
import { I18StringsProps } from '../../../../../i18n/types'

export function DesktopBody<TData>({
  tcIsStriped,
  rows,
  languageStrings,
}: {
  tcIsStriped?: boolean,
  rows: Row<TData>[],
  languageStrings: I18StringsProps,
}) {
  const rowsIsEmpty = rows.length === 0

  return (
    <div
      className="tc-table-desktop-body"
    >
      <NoRecords
        isShow={rowsIsEmpty}
        languageStrings={languageStrings}
      />

      {
        rows
          .map((row) => (
            <div
              key={row.id}
              className={tcIsStriped
                ? 'tc-table-desktop-row tc-table-desktop-row--striped'
                : 'tc-table-desktop-row'}
              data-cy={tcIsStriped
                ? 'table-row-striped'
                : 'table-row'}
            >
              {row.getVisibleCells()
                .map((cell) => (
                  <div
                    key={cell.id}
                    {...getStyles({
                      width: cell.column.getSize(),
                      align: cell.column.columnDef.tcAlign,
                    })}
                    className={`tc-table-desktop-cell ${setActionCellClassName(cell.column)}`}
                    data-cy="table-cell"
                  >
                    {
                      flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )
                    }
                  </div>
                ))}
            </div>
          ))
      }
    </div>
  )
}
