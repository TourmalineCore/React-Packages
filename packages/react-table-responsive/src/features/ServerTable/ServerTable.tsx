import {
  useCallback, useEffect, useRef, useState,
} from 'react'
import {
  ColumnFiltersState, ColumnSort, PaginationState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from '@tanstack/react-table'
import axios from 'axios'
import * as qs from 'qs'
import { debounce } from 'lodash'
import { ACTIONS_COLUMN_ID, getActionsDropdownColumn } from '../utils/getActionsDropdownColumn'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { DesktopTable } from '../components/DesktopTable/DesktopTable'
import { MobileTable } from '../components/MobileTable/MobileTable'
import { i18n } from '../../i18n/i18n'
import { getDefaultTablePageSize } from '../utils/pagination-utils'
import { TablesState } from '../state/tables-state'
import {
  AVAILABLE_PAGE_SIZES, START_PAGE_INDEX, DEFAULT_COLUMN_PARAMS, fuzzyFilter,
} from '../utils/constants'
import { ServerTableProps, Params } from '../../types/types'

const tablesState = new TablesState()

export function ServerTable<TData>({
  tableId,
  columns,
  tcLoading,
  tcIsStriped,
  tcOrder,
  tcRefresh = false,
  tcHttpClient = axios,
  tcCustomDataLoader,
  tcApiHostUrl,
  tcDataPath,
  tcAuthToken,
  tcRequestMethod = 'GET',
  tcRequestData = {},
  tcMaxStillMobileBreakpoint = 800,
  tcRenderMobileTitle = () => null,
  tcPageSizeOptions = AVAILABLE_PAGE_SIZES,
  tcActions = [],
  tcLanguage = 'en',
  tcEnableTableStatePersistence = false,
  tcOnPageDataLoaded = () => null,
  tcOnFiltersChange = () => null,
  ...props
}: ServerTableProps<TData>) {
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
    tableDataLoading,
    setTableDataLoading,
  ] = useState(false)

  const fetchIdRef = useRef(0)

  const fetchDataDebounced = useCallback(debounce(fetchData, 300), [])

  const [state, setState] = useState({
    data: [],
    totalCount: 0,
    pageCount: 0,
  });

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

  const {
    data,
    totalCount,
    pageCount,
  } = state;

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
    pageCount,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    enableMultiSort: false,
    enableSortingRemoval: false,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    ...props,
  })

  const {
    columnFilters,
    sorting,
    pagination: {
      pageIndex,
      pageSize,
    },
  } = tableProps.getState()

  useEffect(() => {
    fetchDataDebounced({
      tableState: {
        pageIndex,
        pageSize,
        sortBy: sorting[0],
        filters: columnFilters,
      },
      requestData: tcRequestData,
    })
  }, [
    pageIndex,
    pageSize,
    sorting,
    columnFilters,
    tcRefresh,
  ])

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

  useEffect(() => {
    tcOnFiltersChange(columnFilters)
  }, [
    columnFilters,
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
        totalCount={totalCount}
        noFilters={noFilters}
        tcLoading={tcLoading || tableDataLoading}
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
        totalCount={totalCount}
        tcLoading={tcLoading || tableDataLoading}
        actions={tcActions}
        languageStrings={i18n(tcLanguage)}
      />
    )

  async function fetchData({
    tableState,
    requestData,
  }: {
    tableState: {
      pageIndex: number,
      pageSize: number,
      sortBy: ColumnSort,
      filters: ColumnFiltersState,
    },
    requestData: ServerTableProps<TData>['tcRequestData'],
  }) {
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    const {
      pageIndex,
      pageSize,
      sortBy,
      filters,
    } = tableState

    const params: Params = {
      draw: fetchId,
      page: pageIndex + 1,
      pageSize,
      orderBy: sortBy.id.toLowerCase(),
      orderingDirection: sortBy.desc
        ? 'desc'
        : 'asc',
      filteredByColumns: filters.map((x) => x.id),
      // We need to remove comma symbols to be able to serialize arrays correctly (foo=1,foo=2,foo=asd)
      // Downside is that we cannot filter by strings with commas correctly
      filteredByValues: filters.map((x) => String(x.value)
        .replace(/,/g, '')),
    }

    setTableDataLoading(true)

    const dataLoader: ServerTableProps<TData>['tcCustomDataLoader'] | ServerTableProps<TData>['tcHttpClient'] = tcCustomDataLoader || tcHttpClient

    const {
      data,
    } = await dataLoader({
      url: `${tcApiHostUrl}${tcDataPath}`,
      method: tcRequestMethod,
      headers: createAuthAndLanguageHeaders(),
      params,
      data: requestData!,
      paramsSerializer: (params: Params) => qs.stringify(params, {
        arrayFormat: 'repeat',
      }),
    })

    setState({
      ...state,
      data: data.list,
      totalCount: data.totalCount,
      pageCount: Math.ceil(data.totalCount / pageSize),
    });

    tcOnPageDataLoaded(data.list)

    setTableDataLoading(false)
  }

  function createAuthAndLanguageHeaders() {
    return {
      ...(tcAuthToken && {
        Authorization: `Bearer ${tcAuthToken}`,
      }),
      language: tcLanguage,
    }
  }
}
