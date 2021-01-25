/* eslint-disable no-nested-ternary */
import React from 'react';

import DesktopPagination from './components/DesktopPagination/DesktopPagination';
import NoRecords from '../NoRecords/NoRecords';

import './DesktopTable.css';

const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align, cell.column.alignItems);

const getStyles = (props, align = 'left', alignItems = 'flex-start') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems,
      display: 'flex',
    },
  },
];

export default function DesktopTable({
  tableId,
  getTableProps,
  headerGroups,
  footerGroups,
  prepareRow,
  rows,
  page,
  totalCount,
  canPreviousPage,
  canNextPage,
  pageCount,
  nextPage,
  previousPage,
  setPageSize,
  state: {
    pageIndex,
    pageSize,
  },
  noFooter,
  loading,
  languageStrings,
}) {
  const {
    loadingLabel,
  } = languageStrings;

  return (
    <div className="tc-table-desktop">
      <div className="tc-table-desktop__inner">
        <div {...getTableProps()} className="tc-table-desktop__content">
          <div className="tc-table-desktop__header">
            {headerGroups.map((headerGroup) => (
              <React.Fragment key={`headergroup-wrapper-${headerGroup.id}`}>
                <div
                  {...headerGroup.getHeaderGroupProps()}
                  className="tc-table-desktop__tr"
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps({ ...headerProps, ...(column.getSortByToggleProps ? column.getSortByToggleProps() : {}) })}
                      title={column.render('Header')}
                      className={`tc-table-desktop__th tc-table-desktop__th--header
                        ${column.isSorted
                        ? column.isSortedDesc
                          ? 'tc-table-desktop__th--sort-desc'
                          : 'tc-table-desktop__th--sort-asc'
                        : ''}`}
                    >
                      {column.render('Header')}
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      {column.canResize && (
                        <div
                          {...column.getResizerProps({
                            // This disables sorting when resizing ends
                            onClick: (e) => { e.stopPropagation(); e.preventDefault(); },
                          })}
                          className="resizer"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div
                  {...headerGroup.getHeaderGroupProps()}
                  key="filters-row"
                  className="tc-table-desktop__tr tc-table-desktop__tr--filter"
                >
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="tc-table-desktop__th">
                      {/* Render the columns filter UI */}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="tc-table-desktop__body">
            {page.map((row) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tc-table-desktop__tr">
                  {row.cells.map((cell) => (
                    <div {...cell.getCellProps(cellProps)} className="tc-table-desktop__td">
                      {cell.render('Cell')}
                    </div>
                  ))}
                </div>
              );
            })}

            {
              rows.length === 0
              && <NoRecords languageStrings={languageStrings} />
            }

            {
              !noFooter && rows.length > 0
              && footerGroups.map((group) => (
                <div
                  {...group.getFooterGroupProps()}
                  key={`footergroup-${group.id}`}
                  className="tc-table-desktop__tr tc-table-desktop__tr--footer"
                >
                  {group.headers.map((column) => (
                    <div
                      {...column.getFooterProps(headerProps)}
                      key={`footercolumn-${column.id}`}
                      className="tc-table-desktop__td"
                    >
                      {column.render('Footer')}
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <DesktopPagination
        tableId={tableId}
        totalCount={totalCount || rows.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        languageStrings={languageStrings}
      />

      {
        loading
        && (
        <div className="tc-table-desktop__loading-overlay">
          {loadingLabel}
        </div>
        )
      }
    </div>
  );
}
