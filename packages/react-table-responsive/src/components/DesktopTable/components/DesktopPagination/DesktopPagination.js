import React from 'react';

import Select from '../Select/Select';
import { saveTablePageSize } from './paginationUtils';

import './DesktopPagination.css';

const availablePageSizes = [10, 20, 50, 100];

export default function DesktopPagination({
  tableId,
  totalCount,
  canPreviousPage,
  canNextPage,
  pageCount,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
  languageStrings,
}) {
  const {
    shownLabel,
    fromLabel,
    toLabel,
    ofLabel,
    showLabel,
    noRecordsLabel,
    singleRecordLabel,
    previousPageLabel,
    nextPageLabel,
  } = languageStrings.pagination.desktop;

  return (
    <div className="tc-table-desktop__pagination">
      <div className="tc-table-desktop__pagination-left">
        {
          totalCount === 0
          && noRecordsLabel
        }
        {
          totalCount === 1
          && singleRecordLabel
        }
        {
          totalCount > 1
          && (
          <span>
            {
              [
                shownLabel,
                fromLabel,
                pageIndex * pageSize + 1,
                toLabel,
                Math.min(totalCount, (pageIndex + 1) * pageSize),
                ofLabel,
                totalCount,
              ].join(' ')
            }
          </span>
          )
        }
        {' '}
      </div>

      <div className="tc-table-desktop__pagination-center">
        <Select
          value={pageSize}
          options={availablePageSizes.map((pageSizeOption) => ({
            label: `${showLabel} ${pageSizeOption}`,
            value: pageSizeOption,
          }))}
          onChange={(e) => {
            const newPageSize = Number(e.target.value);

            saveTablePageSize(tableId, newPageSize);
            setPageSize(newPageSize);
          }}
        />
      </div>

      <div className="tc-table-desktop__pagination-right">
        <div className="tc-table-desktop__table-pagination-buttons">
          <PaginationButton
            text={previousPageLabel}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          />
          {
            totalCount > 0
            && (
            <>
              <button
                type="button"
                className="tc-table-desktop__table-page-button tc-table-desktop__table-page-button--active tc-table-desktop__table-page-button--round"
              >
                {pageIndex + 1}
              </button>
              <div className="tc-table-desktop__of-total">
                {`${ofLabel} ${pageCount}`}
              </div>
            </>
            )
          }
          <PaginationButton
            text={nextPageLabel}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          />
        </div>
      </div>
    </div>
  );
}

function PaginationButton({
  text,
  disabled,
  active,
  onClick = () => {},
}) {
  return (
    <button
      type="button"
      className={`tc-table-desktop__table-page-button ${active ? 'tc-table-desktop__table-page-button--active' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
