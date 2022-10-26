import { useEffect } from 'react';

import { matchSorter } from 'match-sorter';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  Row,
} from 'react-table';

import DesktopTable from '../DesktopTable/DesktopTable';
import MobileTable from '../MobileTable/MobileTable';
import DefaultColumnFilter from '../Filters/DefaultColumnFilter';

import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { getDefaultTablePageSize } from '../DesktopTable/components/DesktopPagination/paginationUtils';

import createActionsColumn, { ACTIONS_COLUMN_ID } from '../Actions/actionsColumnFactory';

import {
  saveFilters,
  saveSortBy,
  getDefaultFilters,
  getDefaultSortBy,
} from '../../utils/tableStateService';

import { i18n } from '../../i18n/i18n';
import { IClientTable } from '../../types';

const defaultColumn = {
  // Let's set up our default Filter UI
  Filter: DefaultColumnFilter,
  // When using the useFlexLayout:
  minWidth: 80, // minWidth is only used as a limit for resizing
  width: 150, // width is used for both the flex-basis and flex-grow
  maxWidth: 400, // maxWidth is only used as a limit for resizing
};

export default function ClientTable<TableProps extends object = {}>({
  tableId,
  columns,
  data,
  order = {},
  language = 'en',
  renderMobileTitle,
  maxStillMobileBreakpoint = 800,
  loading,
  isStriped,
  actions = [],
  onFiltersChange = () => {},
  // if it is true filters and sortBy will be stored in memory and when you go back to the table its state will be initialized with it
  // it is stored in a const variable thus state dissapears on page reload
  enableTableStatePersistance = false,
  ...props
}: IClientTable<TableProps>) {
  if (!tableId) {
    throw new Error('non-empty and globally unique tableId is required');
  }

  if (actions.length > 0) {
    if (!columns.find((column) => column.id === ACTIONS_COLUMN_ID)) {
      columns.push(createActionsColumn(actions, i18n(language)));
    }
  }

  const filterTypes = {
    // Add a new fuzzyTextFilterFn filter type.
    fuzzyText: fuzzyTextFilterFn,
    // Or, override the default text filter to use
    // "startWith"
    text: (rows: Row<TableProps>[], id: string, filterValue: string) => rows.filter((row) => {
      const rowValue = row.values[id];

      return rowValue !== undefined
        ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
        : true;
    }),
  };

  const tableProps = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      autoResetFilters: false,
      autoResetSortBy: false,
      initialState: {
        pageSize: getDefaultTablePageSize(tableId),
        sortBy: getDefaultSortBy(tableId, [order]),
        filters: getDefaultFilters<TableProps>(tableId, []),
      },
      disableMultiSort: true,
      disableSortRemove: true,
      ...props,
    },
    useResizeColumns,
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    setPageSize,
    gotoPage,
    rows,
    state: {
      filters,
      sortBy,
    },
  } = tableProps;

  const { width: windowWidth } = useWindowDimensions();

  const isDesktop = windowWidth > maxStillMobileBreakpoint;

  useEffect(() => {
    if (isDesktop) {
      setPageSize(getDefaultTablePageSize(tableId));
    } else {
      setPageSize(10);
    }

    gotoPage(0);
  }, [isDesktop]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  // it should be fince since we don't expect this setting to be dynamically changed
  // in case it is changed it will fail with a hooks-related exception and it's good
  if (enableTableStatePersistance) {
    useEffect(() => {
      saveFilters<TableProps>(tableId, filters);
    }, [filters]);

    useEffect(() => {
      saveSortBy<TableProps>(tableId, sortBy);
    }, [sortBy]);
  }

  const noFooter = columns.every((column: any) => !column.Footer);

  return isDesktop
    ? (
      <DesktopTable<TableProps>
        {...tableProps}
        tableId={tableId}
        languageStrings={i18n(language)}
        noFooter={noFooter}
        totalCount={rows.length}
        loading={loading}
        isStriped={isStriped}
      />
    )
    : (
      <MobileTable<TableProps>
        {...tableProps}
        renderMobileTitle={renderMobileTitle}
        languageStrings={i18n(language)}
        noFooter={noFooter}
        totalCount={rows.length}
        loading={loading}
        actions={actions}
      />
    );
}

function fuzzyTextFilterFn(rows: Row<any>[], id: string, filterValue: string) {
  return matchSorter(rows, filterValue, {
    keys: [(row) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: string) => !val;
