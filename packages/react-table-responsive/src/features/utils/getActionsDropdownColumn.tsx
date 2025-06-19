import { CellContext, ColumnDef } from '@tanstack/react-table'
import { ActionsDropdown } from '../../components/ActionsDropdown/ActionsDropdown'
import { ActionsType } from '../../types/types'
import { ACTIONS_COLUMN_ID } from './constants'

export function getActionsDropdownColumn<TData>({
  tableId,
  actions,
}: {
  tableId: string,
  actions: ActionsType<TData>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): ColumnDef<TData, any> {
  return {
    id: ACTIONS_COLUMN_ID,
    header: '',
    enableColumnFilter: false,
    enableSorting: false,
    tcNonMobileColumn: true,
    tcNoFooterColumn: true,
    minSize: 74,
    size: 74,
    maxSize: 74,
    cell: (cellContext: CellContext<TData, unknown>) => (
      <ActionsDropdown<TData>
        tableId={tableId}
        actions={actions}
        rowWithValues={cellContext.row}
      />
    ),
  }
}
