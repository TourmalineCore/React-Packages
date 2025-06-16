import { Select } from '../../../../../components/Select/Select'
import { PaginationButton } from './components/PaginationButton/PaginationButton'
import { I18StringsProps } from '../../../../../i18n/types'
import { saveTablePageSize } from '../../../../utils/pagination-utils'
  
import IconArrLeft  from '../../../../../assets/images/arrow-left.svg'
import IconArrEndLeft  from '../../../../../assets/images/arrow-end-left.svg'
import IconArrRight  from '../../../../../assets/images/arrow-right.svg'
import IconArrEndRight  from '../../../../../assets/images/arrow-end-right.svg'

export function DesktopPagination({
  tableId,
  setPageSize,
  pageSize,
  pageIndex,
  tcPageSizeOptions,
  totalCount,
  firstPage,
  previousPage,
  сanPreviousPage,
  nextPage,
  lastPage,
  canNextPage,
  pageCount,
  languageStrings,
}: {
  tableId: string,
  setPageSize: (page: number) => unknown,
  pageSize: number,
  pageIndex: number,
  tcPageSizeOptions: number[],
  totalCount: number,
  firstPage: () => unknown,
  previousPage: () => unknown,
  сanPreviousPage: boolean,
  nextPage: () => unknown,
  lastPage: () => unknown,
  canNextPage: boolean,
  pageCount: number,
  languageStrings: I18StringsProps,
}) {
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
  } = languageStrings.pagination.desktop

  return (
    <div
      className="tc-table-desktop-pagination"
      data-cy="table-pagination"
    >
      <div className="tc-table-desktop-pagination__left">
        <div
          className="tc-table-desktop-pagination__page-count"
          data-cy="table-pagination-page-count"
        >
          {showLabel}
          {' '}
          <Select
            className="tc-table-desktop-pagination__page-count-select"
            value={pageSize}
            options={tcPageSizeOptions.map((pageSizeOption) => ({
              label: String(pageSizeOption),
              value: pageSizeOption,
            }))}
            dataCy="table-select-pagination"
            onChange={(e) => {
              const newPageSize = e.target.value

              saveTablePageSize({
                tableId,
                pageSize: newPageSize,
              })
              setPageSize(Number(newPageSize))
            }}
          />
        </div>
      </div>
      <div
        className="tc-table-desktop-pagination__center"
        data-cy="table-pagination-shown-records"
      >
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

      <div className="tc-table-desktop-pagination__right">
        <div
          className="tc-table-desktop-pagination__buttons"
          data-cy="table-pagination-buttons"
        >
          <PaginationButton
            title={firstPageLabel}
            disabled={!сanPreviousPage}
            dataCy="first-page-button"
            onClick={firstPage}
          >
            <IconArrEndLeft />
          </PaginationButton>

          <PaginationButton
            title={previousPageLabel}
            disabled={!сanPreviousPage}
            dataCy="prev-page-button"
            onClick={previousPage}
          >
            <IconArrLeft />
          </PaginationButton>
          {
            totalCount > 0
            && (
              <>
                <div
                  className="tc-table-desktop-pagination__current-page"
                  data-cy="table-pagination-page-current"
                >
                  {pageIndex + 1}
                </div>
                <div
                  className="tc-table-desktop-pagination__of-total"
                  data-cy="table-desktop-pagination-of-total"
                >
                  {`${ofLabel} ${pageCount}`}
                </div>
              </>
            )
          }
          <PaginationButton
            title={nextPageLabel}
            disabled={!canNextPage}
            dataCy="next-page-button"
            onClick={nextPage}
          >
            <IconArrRight />
          </PaginationButton>

          <PaginationButton
            title={lastPageLabel}
            disabled={!canNextPage}
            dataCy="last-page-button"
            onClick={lastPage}
          >
            <IconArrEndRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  )
}
