import { AxiosStatic } from 'axios';
import { ReactNode } from 'react';
import {
  Column,
  ColumnInstance,
  Filters,
  IdType,
  Row,
  SortingRule,
  UseFiltersInstanceProps,
  UsePaginationInstanceProps,
  UseTableInstanceProps,
} from 'react-table';

// this type is made to see the keys
export type I18StringsProps = {
  langKey: string;
  loadingLabel: string;
  noRecordsLabel: string;
  totalLabel: string;
  searchLabel: string;
  actionsLabel: string;
  sorting: {
    titleLabel: string;
    columnLabel: string;
    directionLabel: string;
    ascLabel: string;
    descLabel: string;
  },
  filtration: {
    titleLabel: string;
  },
  pagination: {
    desktop: {
      shownLabel: string;
      toLabel: string;
      ofLabel: string;
      showLabel: string;
      noRecordsLabel: string;
      singleRecordLabel: string;
      firstPageLabel: string;
      previousPageLabel: string;
      nextPageLabel: string;
      lastPageLabel: string;
    },
    mobile: {
      shownLabel: string;
      ofLabel: string;
      showMoreLabel: string;
    },
  },
};

export interface IAction<TableProps extends object = {}> {
  name?: string;
  show?: (row?: Row<TableProps>) => boolean;
  renderIcon?: (row?: Row<TableProps>) => JSX.Element | ReactNode;
  renderText?: (row?: Row<TableProps>) => string | ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>, row?: Row<TableProps>) => unknown;
}

export interface IflatHeaders<TableProps extends object = {}> extends ColumnInstance<TableProps> {
  principalFilterableColumn?: boolean;
  nonMobileColumn?: boolean;
  noFooterColumn?: boolean;
}

export interface IMobileHeader<TableProps extends object = {}> extends
  Partial<UseFiltersInstanceProps<TableProps>> {
  flatHeaders: IflatHeaders<TableProps>[];
  sortBy: SortingRule<TableProps>[];
  filters: Filters<TableProps>;
  toggleSortBy: (columnId: IdType<TableProps>, descending?: boolean, isMulti?: boolean) => void;
  languageStrings: I18StringsProps;
}

export interface IMobileSortingPopup<TableProps extends object = {}> {
  sortableColumns: IflatHeaders<TableProps>[];
  toggleSortBy: (columnId: IdType<TableProps>, descending?: boolean, isMulti?: boolean) => void;
  sortByColumn: SortingRule<TableProps>;
  onClose: () => unknown;
  languageStrings: I18StringsProps;
}

export interface IMobileFiltrationPopup<TableProps extends object = {}> extends
  Partial<UseFiltersInstanceProps<TableProps>> {
  filterableColumns: IflatHeaders<TableProps>[];
  onClose: () => unknown;
  languageStrings: I18StringsProps;
}

export interface IMobilePagination {
  totalCount: number;
  setPageSize: (pageSize: number) => void;
  pageSize: number;
  languageStrings: I18StringsProps;
}

export interface IMobileTable<TableProps extends object = {}> extends
  UseFiltersInstanceProps<TableProps>,
  UsePaginationInstanceProps<TableProps> {
  flatHeaders: IflatHeaders<TableProps>[];
  totalCount: number;
  prepareRow: (row: Row<TableProps>) => void;
  toggleSortBy: (columnId: IdType<TableProps>, descending?: boolean, isMulti?: boolean) => void;
  state: {
    pageSize: number;
    sortBy: SortingRule<TableProps>[];
    filters: Filters<TableProps>;
  },
  renderMobileTitle: ((row: Row<TableProps>) => JSX.Element) | (() => ReactNode);
  noFooter?: boolean;
  loading?: boolean;
  actions: IAction<TableProps>[];
  languageStrings: I18StringsProps;
}

export interface IDesktopPagination {
  tableId: string;
  totalCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  gotoPage: (x: number) => unknown;
  nextPage: () => unknown;
  previousPage: () => unknown;
  setPageSize: (x: number) => unknown;
  pageIndex: number;
  pageSize: number;
  languageStrings: I18StringsProps;
}

export interface IDesktopTable<TableProps extends object = {}> extends
  UsePaginationInstanceProps<TableProps>,
  UseTableInstanceProps<TableProps> {
  tableId: string;
  totalCount: number;
  noFooter?: boolean;
  loading?: boolean;
  isStriped?: boolean;
  languageStrings: I18StringsProps;
}

export interface IClientTable<TableProps extends object = {}> {
  tableId: string;
  columns: Column<TableProps>[];
  data: TableProps[];
  order?: {
    id: string;
    desc: boolean;
  } | {};
  language?: string;
  renderMobileTitle: ((row: Row<TableProps>) => JSX.Element) | (() => ReactNode);
  maxStillMobileBreakpoint?: number;
  loading?: boolean;
  isStriped?: boolean;
  actions?: IAction<TableProps>[];
  onFiltersChange?: (filter?: Filters<TableProps>) => void;
  enableTableStatePersistance?: boolean;
  [key: string]: string | number | undefined | ((row?: Row<TableProps>) => ReactNode) | ((row?: Row<TableProps>) => JSX.Element) | ReactNode;
}

export type Params = {
  draw: number;
  page: number;
  pageSize: number;
  orderBy: string;
  orderingDirection: 'desc' | 'asc';
  filteredByColumns: string[];
  filteredByValues: string[];
};

export interface IServerTable<TableProps extends object = {}> {
  tableId: string;
  columns: Column<TableProps>[];
  order?: {
    id: string;
    desc: boolean;
  } | {};
  refresh?: boolean;
  language?: string;
  renderMobileTitle: ((row: Row<TableProps>) => JSX.Element) | (() => ReactNode);
  httpClient?: AxiosStatic,
  apiHostUrl: string;
  dataPath: string;
  authToken: string;
  requestMethod?: 'GET' | 'POST';
  requestData?: {
    [key: string]: any;
  } | {};
  customDataLoader?: ({
    method,
    headers,
    params,
    data,
    paramsSerializer,
  }:{
    url: string;
    method: string;
    headers: {
      [key: string]: string;
    },
    params: Params;
    data: {
      [key: string]: any;
    },
    paramsSerializer: (params: Params) => string;
  }) => Promise<{
    data: {
      draw: number;
      list: TableProps[];
      totalCount: number;
    }
  }>;
  maxStillMobileBreakpoint?: number;
  loading?: boolean;
  isStriped?: boolean;
  actions?: IAction<TableProps>[];
  onPageDataLoaded?: (dataList: TableProps[]) => void;
  onFiltersChange?: (filter?: Filters<TableProps>) => void;
  enableTableStatePersistance?: boolean;
  [key: string]: string | number | undefined | ((row?: Row<TableProps>) => ReactNode) | ((row?: Row<TableProps>) => JSX.Element) | ReactNode;
}
