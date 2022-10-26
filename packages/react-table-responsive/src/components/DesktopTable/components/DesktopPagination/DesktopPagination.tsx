import React, { ChangeEvent, ReactNode } from 'react';

import Select from '../Select/Select';
import { saveTablePageSize } from './paginationUtils';

import { ReactComponent as IconArrLeft } from '../../../../assets/images/arrow-left.svg';
import { ReactComponent as IconArrEndLeft } from '../../../../assets/images/arrow-end-left.svg';
import { ReactComponent as IconArrRight } from '../../../../assets/images/arrow-right.svg';
import { ReactComponent as IconArrEndRight } from '../../../../assets/images/arrow-end-right.svg';

import './DesktopPagination.css';
import { IDesktopPagination } from '../../../../types';

const availablePageSizes = [10, 20, 50, 100];

export default function DesktopPagination({
  tableId,
  totalCount,
  canPreviousPage,
  canNextPage,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
  languageStrings,
}: IDesktopPagination) {
  const {
    shownLabel,
    toLabel,
    ofLabel,
    showLabel,
    noRecordsLabel,
    singleRecordLabel,
    firstPageLabel,
    previousPageLabel,
    nextPageLabel,
    lastPageLabel,
  } = languageStrings.pagination.desktop;

  return (
    <div className="tc-table-desktop__pagination">
      <div className="tc-table-desktop__pagination-left">
        <div className="tc-table-desktop__page-count">
          {showLabel}
          {' '}
          <Select
            className="tc-table-desktop__page-count-select"
            value={pageSize}
            options={availablePageSizes.map((pageSizeOption) => ({
              label: pageSizeOption,
              value: pageSizeOption,
            }))}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const newPageSize = Number(event.target.value);

              saveTablePageSize(tableId, newPageSize);
              setPageSize(newPageSize);
            }}
          />
        </div>
      </div>

      <div className="tc-table-desktop__pagination-center">
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

      <div className="tc-table-desktop__pagination-right">
        <div className="tc-table-desktop__table-pagination-buttons">
          <PaginationButton
            title={firstPageLabel}
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          >
            <IconArrEndLeft />
          </PaginationButton>
          <PaginationButton
            title={previousPageLabel}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <IconArrLeft />
          </PaginationButton>
          {
            totalCount > 0
            && (
            <>
              <div className="tc-table-desktop__table-page-current">
                {pageIndex + 1}
              </div>
              <div className="tc-table-desktop__of-total">
                {`${ofLabel} ${pageCount}`}
              </div>
            </>
            )
          }
          <PaginationButton
            title={nextPageLabel}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <IconArrRight />
          </PaginationButton>
          <PaginationButton
            title={lastPageLabel}
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          >
            <IconArrEndRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({
  children,
  title,
  disabled,
  active,
  onClick = () => {},
}: {
  children: ReactNode;
  title: string;
  disabled: boolean;
  active?: boolean;
  onClick?: () => unknown;
}) {
  return (
    <button
      type="button"
      className={`tc-table-desktop__table-page-button ${active ? 'tc-table-desktop__table-page-button--active' : ''}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
