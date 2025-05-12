export {
  saveTablePageSize,
  getDefaultTablePageSize,
};

function saveTablePageSize(tableId, pageSize) {
  localStorage.setItem(`${tableId}-page-size`, pageSize);
}

function getDefaultTablePageSize(tableId) {
  const defaultTablePageSize = localStorage.getItem(`${tableId}-page-size`);

  return defaultTablePageSize
    ? Number(defaultTablePageSize)
    : 10;
}
