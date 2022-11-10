import { cloneDeep } from 'lodash';
import { Filters, SortingRule } from 'react-table';

const tablesState: {
  [key in string]: any;
} = {};

export {
  saveFilters,
  saveSortBy,
  getDefaultFilters,
  getDefaultSortBy,
};

function saveFilters<Type extends object = {}>(tableId: string, filters: Filters<Type>) {
  saveTableStatePiece(tableId, 'filters', filters);
}

function saveSortBy<Type extends object = {}>(tableId: string, sortBy: SortingRule<Type>[]) {
  saveTableStatePiece(tableId, 'sortBy', sortBy);
}

function getDefaultFilters<Type extends object = {}>(tableId: string, initialState: Filters<Type>) {
  return getPieceOfTableState(tableId, 'filters', initialState);
}

function getDefaultSortBy(tableId: string, initialState?: { id: string, desc: boolean } | {}) {
  return getPieceOfTableState(tableId, 'sortBy', initialState);
}

function saveTableStatePiece<Type extends object = {}>(tableId: string, propertyName: string, pieceOfState: Type) {
  const prevTableState = getTableState(tableId);

  if (!prevTableState) {
    tablesState[tableId] = {};
  }

  getTableState(tableId)[propertyName] = cloneDeep(pieceOfState);
}

function getPieceOfTableState<Type extends object = {}>(tableId: string, propertyName: string, initialState?: Filters<Type> | { id: string, desc: boolean } | {}) {
  const tableState = getTableState(tableId);

  if (!tableState) {
    return initialState;
  }

  return tableState[propertyName] || initialState;
}

function getTableState(tableId: string) {
  return tablesState[tableId];
}
