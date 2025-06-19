import { useEffect, useState } from 'react'
import {
  PaginationState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from '@tanstack/react-table'
import { getActionsDropdownColumn } from '../utils/getActionsDropdownColumn'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { DesktopTable } from '../components/DesktopTable/DesktopTable'
import { MobileTable } from '../components/MobileTable/MobileTable'
import { i18n } from '../../i18n/i18n'
import { getDefaultTablePageSize } from '../utils/pagination-utils'
import { TablesState } from '../state/tables-state'
import {
  AVAILABLE_PAGE_SIZES, START_PAGE_INDEX, DEFAULT_COLUMN_PARAMS, fuzzyFilter,
  ACTIONS_COLUMN_ID,
} from '../utils/constants'
import { ClientTableProps } from '../../types/types'

const tablesState = new TablesState()

export function ClientTable<TData>({
  tableId,
  columns,
  tcLoading = false,
  tcIsStriped,
  tcOrder,
  data,
  tcMaxStillMobileBreakpoint = 800,
  tcRenderMobileTitle = () => null,
  tcPageSizeOptions = AVAILABLE_PAGE_SIZES,
  tcActions = [],
  tcLanguage = 'en',
  tcOnFiltersChange = () => null,
  tcEnableTableStatePersistence = false,
  ...props
}: ClientTableProps<TData>) {
  if (!tableId) {
    throw new Error('non-empty and globally unique tableId is required')
  }

  if (tcActions.length > 0) {
    if (!columns.find((column) => column.id === ACTIONS_COLUMN_ID)) {
      columns.push(getActionsDropdownColumn<TData>({
        tableId,
        actions: tcActions,
      }))
    }
  }

  const [
    pagination,
    setPagination,
  ] = useState<PaginationState>({
    pageIndex: START_PAGE_INDEX,
    pageSize: getDefaultTablePageSize({
      tableId,
      pageSizeOptions: tcPageSizeOptions,
    }),
  })

  const tableProps = useReactTable({
    columns,
    data,
    defaultColumn: DEFAULT_COLUMN_PARAMS,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      sorting: tablesState.getDefaultSortBy({
        tableId,
        initialState: [
          tcOrder,
        ],
      }),
      columnFilters: tablesState.getDefaultFilters({
        tableId,
        initialState: [],
      }),
    },
    state: {
      pagination,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    enableMultiSort: false,
    enableSortingRemoval: false,
    ...props,
  })

  const {
    columnFilters,
    sorting,
  } = tableProps.getState()

  if (tcEnableTableStatePersistence) {
    useEffect(() => {
      tablesState.saveFilters({
        tableId,
        filters: columnFilters,
      })
    }, [
      columnFilters,
    ])

    useEffect(() => {
      tablesState.saveSortBy({
        tableId,
        sortBy: sorting,
      })
    }, [
      sorting,
    ])
  }

  useEffect(() => {
    tcOnFiltersChange(columnFilters)
  }, [
    columnFilters,
  ])

  const {
    width: windowWidth,
  } = useWindowDimensions()

  const isDesktop = windowWidth > tcMaxStillMobileBreakpoint

  useEffect(() => {
    if (isDesktop) {
      setPagination({
        pageIndex: START_PAGE_INDEX,
        pageSize: getDefaultTablePageSize({
          tableId,
          pageSizeOptions: tcPageSizeOptions,
        }),
      })
    } else {
      setPagination({
        pageIndex: START_PAGE_INDEX,
        pageSize: tcPageSizeOptions[0],
      })
    }
  }, [
    isDesktop,
  ])

  const noFooter = columns.every((column) => !column.footer)

  const noFilters = tableProps
    .getAllColumns()
    .every((column) => !column.columnDef.enableColumnFilter)

  return isDesktop
    ? (
      <DesktopTable<TData>
        {...tableProps}
        tableId={tableId}
        noFooter={noFooter}
        noFilters={noFilters}
        tcLoading={tcLoading}
        tcIsStriped={tcIsStriped}
        tcPageSizeOptions={tcPageSizeOptions}
        languageStrings={i18n(tcLanguage)}
      />
    )
    : (
      <MobileTable<TData>
        {...tableProps}
        tcRenderMobileTitle={tcRenderMobileTitle}
        noFooter={noFooter}
        tcLoading={tcLoading}
        actions={tcActions}
        languageStrings={i18n(tcLanguage)}
      />
    )
}
