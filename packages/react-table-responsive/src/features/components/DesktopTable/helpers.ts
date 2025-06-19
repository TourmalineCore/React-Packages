import { ColumnDef } from '@tanstack/react-table'
import { ACTIONS_COLUMN_ID } from '../../utils/constants'

export function setActionCellClassName<TData>(column: ColumnDef<TData, unknown>) {
  return column.id === ACTIONS_COLUMN_ID ? 'tc-table-desktop__action-cell' : ''
}

const ALIGN_OPTIONS = new Map(
  [
    [
      'left',
      'flex-start',
    ],
    [
      'center',
      'center',
    ],
    [
      'right',
      'flex-end',
    ],
  ],
)

export const getStyles = ({
  width,
  align = 'left',
}: {
  width: number,
  align?: string,
}) => (
  {
    style: {
      justifyContent: ALIGN_OPTIONS.get(align),
      width,
    },
  }
)

export function getTableById({
  tableId,
}: {
  tableId: string,
}) {
  return document.querySelector(`#${tableId}`)
}
