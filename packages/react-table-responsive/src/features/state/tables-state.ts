import { ColumnFiltersState, SortingState } from '@tanstack/react-table'
import { cloneDeep } from 'lodash'

export class TablesState {
  private _state: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any,
  } = {}

  saveSortBy({
    tableId,
    sortBy,
  }: {
    tableId: string,
    sortBy: SortingState,
  }) {
    this._saveTableStatePiece({
      tableId,
      propertyName: 'sortBy',
      pieceOfState: sortBy,
    })
  }

  getDefaultSortBy({
    tableId,
    initialState,
  }: {
    tableId: string,
    initialState: SortingState,
  }) {
    return this._getPieceOfTableState({
      tableId,
      propertyName: 'sortBy',
      initialState,
    })
  }

  saveFilters({
    tableId,
    filters,
  }: {
    tableId: string,
    filters: ColumnFiltersState,
  }) {
    this._saveTableStatePiece({
      tableId,
      propertyName: 'filters',
      pieceOfState: filters,
    })
  }

  getDefaultFilters({
    tableId,
    initialState,
  }: {
    tableId: string,
    initialState: ColumnFiltersState,
  }) {
    return this._getPieceOfTableState({
      tableId,
      propertyName: 'filters',
      initialState,
    })
  }

  getTableState({
    tableId,
  }: {
    tableId: string,
  }) {
    return this._state[tableId]
  }

  private _getPieceOfTableState({
    tableId,
    propertyName,
    initialState,
  }: {
    tableId: string,
    propertyName: string,
    initialState: SortingState | ColumnFiltersState,
  }) {
    const tableState = this.getTableState({
      tableId,
    })

    if (!tableState) {
      return initialState
    }

    return tableState[propertyName] || initialState
  }

  private _saveTableStatePiece({
    tableId,
    propertyName,
    pieceOfState,
  }: {
    tableId: string,
    propertyName: string,
    pieceOfState: SortingState | ColumnFiltersState,
  }) {
    const prevTableState = this.getTableState({
      tableId,
    })

    if (!prevTableState) {
      this._state[tableId] = {}
    }

    this.getTableState({
      tableId,
    })[propertyName] = cloneDeep(pieceOfState)
  }
}
