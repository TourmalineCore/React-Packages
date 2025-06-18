import {
  ColumnDef, ColumnFiltersState, ColumnSort, FilterFn, HeaderContext, Row, RowData, Table, TableOptions,
} from '@tanstack/react-table'
import { AxiosInstance } from 'axios'
import { InputHTMLAttributes, ReactElement, ReactNode } from 'react'
import { I18StringsProps } from '../i18n/types'

export type ActionsType<TData> = {
  name: string,
  show: (row: Row<TData>) => boolean,
  renderIcon?: (row: Row<TData>) => ReactElement,
  renderText: (row: Row<TData>) => string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, row: Row<TData>) => unknown,
}[]

export interface GeneralTableProps<TData> extends Omit<TableOptions<TData>, 'data' | 'column' | 'getCoreRowModel' | 'filterFns'> {
  tableId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[],
  tcLoading?: boolean,
  tcIsStriped?: boolean,
  tcOrder: ColumnSort,
  tcRenderMobileTitle?: (row: Row<TData>) => ReactNode,
  tcMaxStillMobileBreakpoint?: number,
  tcPageSizeOptions?: number[],
  tcActions?: ActionsType<TData>,
  tcLanguage?: 'en' | 'ru',
  tcEnableTableStatePersistence?: boolean,
  tcOnFiltersChange?: (filters: ColumnFiltersState) => void,
}

export interface ClientTableProps<TData> extends GeneralTableProps<TData> {
  data: TData[],
}

export interface ServerTableProps<TData> extends GeneralTableProps<TData> {
  tcDataPath: string,
  tcApiHostUrl: string,
  tcRequestData?: object,
  tcAuthToken?: string,
  tcRequestMethod?: 'POST' | 'GET',
  tcHttpClient?: AxiosInstance,
  tcRefresh?: boolean,
  tcCustomDataLoader?: CustomDataLoader,
  tcOnPageDataLoaded?: (data: TData) => void,
}

export type CustomDataLoader = ({
  url,
  method,
  headers,
  params,
  data,
  paramsSerializer,
}: {
  url: string,
  method: 'POST' | 'GET',
  headers: {
    [key: string]: string,
  },
  params: Params,
  data: object,
  paramsSerializer: (params: Params) => string,
}) => Promise<{
  data: {
    draw: number,
    list: {
      [tableDataKey: string]: string | number,
    }[],
    totalCount: number
  },
}>

export type Params = {
  draw: number,
  page: number,
  pageSize: number,
  orderBy: string,
  orderingDirection: 'desc' | 'asc',
  filteredByColumns: string[],
  filteredByValues: string[],
}

export interface MobileTableProps<TData>
  extends Table<TData>,
  Pick<GeneralTableProps<TData>, 'tcLoading' | 'tcRenderMobileTitle'> {
  noFooter: boolean,
  actions: ActionsType<TData>,
  languageStrings: I18StringsProps,
  totalCount?: number,
}

export interface DesktopTableProps<TData>
  extends Table<TData>,
  Pick<GeneralTableProps<TData>, 'tableId' | 'tcLoading' | 'tcIsStriped'> {
  tcPageSizeOptions: number[],
  noFooter: boolean,
  noFilters: boolean,
  languageStrings: I18StringsProps,
  totalCount?: number,
}

declare module '@tanstack/react-table' {
  export interface ColumnDefBase<TData extends RowData, TValue = unknown> {
    id: string,
    tcNonMobileColumn?: boolean,
    tcTwoRowsMobileLayout?: boolean,
    tcNoFooterColumn?: boolean,
    tcFilter?: (context: HeaderContext<TData, TValue>) => ReactNode,
    tcSelectFilterOptions?: {
      label: string,
      value: string | number,
    }[],
    tcAlign?: 'left' | 'center' | 'right',
    tcInputFilterProps?: InputHTMLAttributes<HTMLInputElement>,
    tcPrincipalFilterableColumn?: boolean,
  }

  export interface FilterFns {
    fuzzy: FilterFn<unknown>,
  }
}
