import React, { useEffect } from 'react';

import { matchSorter } from 'match-sorter';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
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

const defaultColumn = {
  // Let's set up our default Filter UI
  Filter: DefaultColumnFilter,
  // When using the useFlexLayout:
  minWidth: 80, // minWidth is only used as a limit for resizing
  width: 150, // width is used for both the flex-basis and flex-grow
  maxWidth: 400, // maxWidth is only used as a limit for resizing
};

const filterTypes = {
  // Add a new fuzzyTextFilterFn filter type.
  fuzzyText: fuzzyTextFilterFn,
  // Or, override the default text filter to use
  // "startWith"
  text: (rows, id, filterValue) => rows.filter((row) => {
    const rowValue = row.values[id];

    return rowValue !== undefined
      ? String(rowValue)
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase())
      : true;
  }),
};

export default function ClientTable({
  tableId,
  columns,
  data,
  order = {},
  language = 'en',
  renderMobileTitle,
  maxStillMobileBreakpoint = 800,
  loading,
  actions = [],
  onFiltersChange = () => {},
  // if it is true filters and sortBy will be stored in memory and when you go back to the table its state will be initialized with it
  // it is stored in a const variable thus state dissapears on page reload
  enableTableStatePersistance = false,
}) {
  if (!tableId) {
    throw new Error('non-empty and globally unique tableId is required');
  }

  if (actions.length > 0) {
    if (!columns.find((column) => column.id === ACTIONS_COLUMN_ID)) {
      columns.push(createActionsColumn(actions, i18n(language)));
    }
  }

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
        filters: getDefaultFilters(tableId, []),
      },
      disableMultiSort: true,
      disableSortRemove: true,
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
      saveFilters(tableId, filters);
    }, [filters]);

    useEffect(() => {
      saveSortBy(tableId, sortBy);
    }, [sortBy]);
  }

  const noFooter = columns.every((column) => !column.Footer);

  return isDesktop
    ? (
      <DesktopTable
        {...tableProps}
        tableId={tableId}
        languageStrings={i18n(language)}
        noFooter={noFooter}
        totalCount={rows.length}
        loading={loading}
      />
    )
    : (
      <MobileTable
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

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
