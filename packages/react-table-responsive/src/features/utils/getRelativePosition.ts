import { RefObject } from 'react'
import { getTableById } from '../components/DesktopTable/helpers'

export function getRelativePosition({
  tableId,
  targetElem,
}: {
  tableId: string,
  targetElem: RefObject<HTMLDivElement>,
}) {
  const tableContainer = getTableById({
    tableId,
  })

  if (!targetElem || !tableContainer) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }
  }

  const parentPos = tableContainer!.getBoundingClientRect()
  const childPos = targetElem.current!.getBoundingClientRect()

  return {
    left: childPos.left - parentPos.left,
    right: childPos.right - parentPos.right,
    top: childPos.top - parentPos.top,
    bottom: childPos.bottom - parentPos.bottom,
  }
}
