/* eslint-disable no-shadow */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { debounce } from 'lodash';
import * as qs from 'qs';
import axios from 'axios';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useFilters,
  usePagination,
  useSortBy,
} from 'react-table';

import DesktopTable from '../DesktopTable/DesktopTable';
import MobileTable from '../MobileTable/MobileTable';
import DefaultColumnFilter from '../Filters/DefaultColumnFilter';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import {
  getDefaultTablePageSize,
} from '../DesktopTable/components/DesktopPagination/paginationUtils';
import createActionsColumn, { ACTIONS_COLUMN_ID } from '../Actions/actionsColumnFactory';
import {
  getDefaultSortBy,
  getDefaultFilters,
  saveFilters,
  saveSortBy,
} from '../../utils/tableStateService';

import { i18n } from '../../i18n/i18n';

const emptyRequestData = {};

export default function ServerTable({
  tableId,
  columns,
  order = {},
  refresh = false,
  language = 'en',
  renderMobileTitle,
  apiHostUrl,
  dataPath,
  authToken,
  requestMethod = 'GET',
  requestData = emptyRequestData,
  maxStillMobileBreakpoint = 800,
  loading,
  actions = [],
  onPageDataLoaded = () => {},
  onFiltersChange = () => {},
  // if it is true filters and sortBy will be stored in memory and when you go back to the table its state will be initialized with it
  // it is stored in a const variable thus state dissapears on page reload
  enableTableStatePersistance = false,
}) {
  if (!tableId) {
    throw new Error('non-empty and globally unique tableId is required');
  }

  const [state, setState] = useState({
    data: [],
    pageCount: 0,
    totalCount: 0,
  });
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const fetchIdRef = useRef(0);

  const fetchDataDebounced = useCallback(debounce(fetchData, 300), []);

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // When using the useFlexLayout:
      minWidth: 80, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 400, // maxWidth is only used as a limit for resizing
    }),
    [],
  );

  if (actions.length > 0) {
    if (!columns.find((column) => column.id === ACTIONS_COLUMN_ID)) {
      columns.push(createActionsColumn(actions, i18n(language)));
    }
  }

  const {
    data,
    pageCount,
    totalCount,
  } = state;

  const tableProps = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      initialState: {
        pageSize: getDefaultTablePageSize(tableId),
        sortBy: getDefaultSortBy(tableId, [order]),
        filters: getDefaultFilters(tableId, []),
      },
      disableMultiSort: true,
      disableSortRemove: true,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      pageCount,
    },
    useResizeColumns,
    useFlexLayout,
    useFilters,
    useSortBy,
    usePagination,
  );

  const {
    setPageSize,
    gotoPage,
    state: {
      pageIndex,
      pageSize,
      filters,
      sortBy,
    },
  } = tableProps;

  const {
    width: windowWidth,
  } = useWindowDimensions();

  const isDesktop = windowWidth > maxStillMobileBreakpoint;

  useEffect(() => {
    if (isDesktop) {
      setPageSize(getDefaultTablePageSize(tableId));
    } else {
      setPageSize(10);
    }

    gotoPage(0);
  },
  [isDesktop]);

  // it should be fince since we don't expect this setting to be dynamically changed
  // in case it is changed it will fail with a hooks-related exception and it's good
  if (enableTableStatePersistance) {
    useEffect(() => {
      saveFilters(tableId, filters);
    },
    [filters]);

    useEffect(() => {
      saveSortBy(tableId, sortBy);
    },
    [sortBy]);
  }

  useEffect(() => {
    onFiltersChange(filters);
  },
  [filters]);

  useEffect(() => {
    fetchDataDebounced({
      pageIndex,
      pageSize,
      filters,
      sortBy,
    }, {
      requestData,
    });
  }, [
    pageIndex,
    pageSize,
    filters.map((filter) => `${filter.ud}:${filter.value}`).join(';'),
    `${sortBy[0].id}:${sortBy[0].desc}`,
    refresh,
    requestData,
  ]);

  const noFooter = columns.every((column) => !column.Footer);

  return isDesktop
    ? (
      <DesktopTable
        {...tableProps}
        tableId={tableId}
        languageStrings={i18n(language)}
        noFooter={noFooter}
        totalCount={totalCount}
        loading={loading || tableDataLoading}
      />
    )
    : (
      <MobileTable
        {...tableProps}
        renderMobileTitle={renderMobileTitle}
        languageStrings={i18n(language)}
        noFooter={noFooter}
        totalCount={totalCount}
        loading={loading || tableDataLoading}
        actions={actions}
      />
    );

  async function fetchData(tableState, fetchDataParams) {
    const {
      pageIndex,
      pageSize,
      filters,
      sortBy,
    } = tableState;

    const {
      requestData,
    } = fetchDataParams;

    const {
      id,
      desc,
    } = sortBy[0];

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    const params = {
      draw: fetchId,
      page: pageIndex + 1,
      pageSize,
      orderBy: id,
      orderingDirection: desc
        ? 'desc'
        : 'asc',
      filteredByColumns: filters.map((x) => x.id),
      // We need to remove comma symbols to be able to serialize arrays correctly (foo=1,foo=2,foo=asd)
      // Downside is that we cannot filter by strings with commas correctly
      filteredByValues: filters.map((x) => x.value.replace(/,/g, '')),
    };
    const postData = {
      ...requestData,
    };

    setTableDataLoading(true);

    const {
      data,
    } = await axios({
      url: `${apiHostUrl}${dataPath}`,
      method: requestMethod,
      headers: createAuthAndLanguageHeaders(),
      params,
      data: postData,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });

    if (data.draw !== fetchIdRef.current) {
      return;
    }

    setState({
      ...state,
      data: data.list,
      totalCount: data.totalCount,
      params,
      postData,
      pageCount: Math.ceil(data.totalCount / pageSize),
    });

    onPageDataLoaded(data.list);

    setTableDataLoading(false);
  }

  function createAuthAndLanguageHeaders() {
    return {
      Authorization: `Bearer ${authToken}`,
      language,
    };
  }
}
