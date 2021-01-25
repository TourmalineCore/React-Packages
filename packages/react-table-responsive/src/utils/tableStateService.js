import { cloneDeep } from 'lodash';

const tablesState = {};

export {
  saveFilters,
  saveSortBy,
  getDefaultFilters,
  getDefaultSortBy,
};

function saveFilters(tableId, filters) {
  saveTableStatePiece(tableId, 'filters', filters);
}

function saveSortBy(tableId, sortBy) {
  saveTableStatePiece(tableId, 'sortBy', sortBy);
}

function getDefaultFilters(tableId, initialState) {
  return getPieceOfTableState(tableId, 'filters', initialState);
}

function getDefaultSortBy(tableId, initialState) {
  return getPieceOfTableState(tableId, 'sortBy', initialState);
}

function saveTableStatePiece(tableId, propertyName, pieceOfState) {
  const prevTableState = getTableState(tableId);

  if (!prevTableState) {
    tablesState[tableId] = {};
  }

  getTableState(tableId)[propertyName] = cloneDeep(pieceOfState);
}

function getPieceOfTableState(tableId, propertyName, initialState) {
  const tableState = getTableState(tableId);

  if (!tableState) {
    return initialState;
  }

  return tableState[propertyName] || initialState;
}

function getTableState(tableId) {
  return tablesState[tableId];
}
