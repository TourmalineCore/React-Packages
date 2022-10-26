export {
  saveTablePageSize,
  getDefaultTablePageSize,
};

function saveTablePageSize(tableId: string, pageSize: number) {
  localStorage.setItem(`${tableId}-page-size`, pageSize.toString());
}

function getDefaultTablePageSize(tableId: string) {
  const defaultTablePageSize = localStorage.getItem(`${tableId}-page-size`);

  return defaultTablePageSize
    ? Number(defaultTablePageSize)
    : 10;
}
