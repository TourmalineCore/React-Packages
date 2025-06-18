import { I18StringsProps } from '../../../../../i18n/types'

export function MobilePagination({
  totalCount,
  pageSize,
  setPageSize,
  languageStrings,
}: {
  totalCount: number,
  pageSize: number,
  setPageSize: (size: number) => unknown,
  languageStrings: I18StringsProps,
}) {
  const {
    shownLabel,
    ofLabel,
    showMoreLabel,
  } = languageStrings.pagination.mobile

  return (
    <div
      className="tc-table-mobile__row tc-table-mobile-pagination"
      data-cy="table-mobile-pagination"
    >
      <div className="tc-table-mobile-pagination__counter">
        {`${shownLabel} `}
        <span
          className="tc-table-mobile-pagination__showing"
          data-cy="table-mobile-counter"
        >
          {Math.min(totalCount, pageSize)}
        </span>
        {` ${ofLabel} `}
        <span
          data-cy="table-mobile-total-count"
        >
          {totalCount}
        </span>
      </div>

      {
        canShowMore() && (
          <button
            type="button"
            className="tc-table-mobile-pagination__show-more"
            data-cy="table-mobile-show-more"
            onClick={() => setPageSize(pageSize * 2)}
          >
            {showMoreLabel}
          </button>
        )
      }

    </div>
  )

  function canShowMore() {
    if (totalCount === 0) {
      return false
    }

    if (totalCount <= pageSize) {
      return false
    }

    return true
  }
}
