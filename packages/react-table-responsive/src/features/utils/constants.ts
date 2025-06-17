import { rankItem } from '@tanstack/match-sorter-utils'
import { FilterFn } from '@tanstack/react-table'
import { DefaultColumnFilter } from '../../components/Filters/DefaultColumnFilter/DefaultColumnFilter'

export const DEFAULT_COLUMN_PARAMS = {
  tcFilter: DefaultColumnFilter,

  enableSorting: false,
  enableColumnFilter: false,
  minSize: 80,
  size: 150,
  maxSize: 400,
}

export const AVAILABLE_PAGE_SIZES = [
  10,
  20,
  50,
  100,
]

export const START_PAGE_INDEX = 0

export const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank,
  })

  return itemRank.passed
}
