export function getDefaultTablePageSize({
  tableId,
  pageSizeOptions,
}: {
  tableId: string,
  pageSizeOptions: number[],
}) {
  const defaultTablePageSize = localStorage.getItem(`${tableId}-page-size`)

  return defaultTablePageSize
    ? Number(defaultTablePageSize)
    : pageSizeOptions[0]
}

export function saveTablePageSize({
  tableId,
  pageSize,
}: {
  tableId: string,
  pageSize: string,
}) {
  localStorage.setItem(`${tableId}-page-size`, pageSize)
}
