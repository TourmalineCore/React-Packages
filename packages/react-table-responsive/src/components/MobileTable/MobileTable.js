import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import NoRecords from '../NoRecords/NoRecords';
import MobileHeader from './components/MobileHeader/MobileHeader';
import MobilePagination from './components/MobilePagination/MobilePagination';

import './MobileTable.css';

export default function MobileTable({
  flatHeaders,
  setAllFilters,
  toggleSortBy,
  prepareRow,
  page,
  totalCount,
  setPageSize,
  state: {
    pageSize,
    sortBy,
  },
  renderMobileTitle,
  noFooter,
  loading,
  actions,
  languageStrings,
}) {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const {
    totalLabel,
    loadingLabel,
  } = languageStrings;

  return (
    <div className="tc-table-mobile">
      <MobileHeader
        flatHeaders={flatHeaders}
        setAllFilters={setAllFilters}
        languageStrings={languageStrings}
        toggleSortBy={toggleSortBy}
        sortBy={sortBy}
      />
      <ul className="tc-table-mobile__list">
        {
          page.map((row) => {
            prepareRow(row);
            return (
              <li className="tc-table-mobile__row" key={row.id}>
                <div className="tc-table-mobile__row-header">
                  <h2 className="tc-table-mobile__row-title">{renderMobileTitle(row)}</h2>
                  <button
                    type="button"
                    className="tc-table-mobile__row-trigger"
                    onClick={() => (row.id === expandedRowId ? setExpandedRowId(null) : setExpandedRowId(row.id))}
                  >
                    <FontAwesomeIcon
                      className={`tc-table-mobile__chevron tc-table-mobile__chevron--${row.id === expandedRowId ? 'up' : 'down'}`}
                      icon={faChevronDown}
                    />
                  </button>
                </div>
                {
                  expandedRowId === row.id && (
                    <>
                      <div className="tc-table-mobile__row-inner">
                        {
                          row.cells
                            .filter((cell) => !cell.column.nonMobileColumn)
                            .map((cell) => (
                              <div
                                key={`${cell.column.id}`}
                                className={`tc-table-mobile__row-inner-item ${cell.column.twoRowsMobileLayout ? 'tc-table-mobile__row-inner-item--vertical' : ''}`}
                              >
                                <div className="tc-table-mobile__label">
                                  {cell.render('Header')}
                                </div>
                                <div className="tc-table-mobile__value">
                                  {cell.render('Cell')}
                                </div>
                              </div>
                            ))
                        }
                      </div>
                      {
                        actions.length > 0
                        && (
                        <div className="tc-table-mobile__actions">
                          {
                            actions
                              .filter((action) => action.show(row))
                              .map((action) => (
                                <button
                                  key={`${action.name}-${row.id}`}
                                  type="button"
                                  className="tc-table-mobile-action"
                                  onClick={(e) => action.onClick(e, row)}
                                >
                                  <span className="tc-table-mobile-action__inner">
                                    <span className="tc-table-mobile-action__label">{action.renderText(row)}</span>
                                    <span className="tc-table-mobile-action__icon">
                                      {action.renderIcon(row)}
                                    </span>
                                  </span>
                                </button>
                              ))
                          }
                        </div>
                        )
                      }
                    </>
                  )
                }
              </li>
            );
          })
        }
        {
          totalCount === 0
          && <NoRecords languageStrings={languageStrings} />
        }
        {
          !noFooter
          && (
          <li className="tc-table-mobile__row">
            <div className="tc-table-mobile__row-header">
              <h2 className="tc-table-mobile__row-title">{totalLabel}</h2>
            </div>
            <div className="tc-table-mobile__row-inner">
              {
                flatHeaders
                  .filter((column) => !column.nonMobileColumn)
                  .filter((column) => !column.noFooterColumn)
                  .map((column) => (
                    <div key={`total-${column.id}`} className="tc-table-mobile__row-inner-item">
                      <div className="tc-table-mobile__label">
                        {column.render('Header')}
                      </div>
                      <div className="tc-table-mobile__value">
                        {column.render('Footer')}
                      </div>
                    </div>
                  ))
              }
            </div>
          </li>
          )
        }
        <MobilePagination
          totalCount={totalCount}
          setPageSize={setPageSize}
          pageSize={pageSize}
          languageStrings={languageStrings}
        />
      </ul>

      {loading && (
        <div className="tc-table-mobile__loading-overlay">
          {loadingLabel}
        </div>
      )}
    </div>
  );
}
