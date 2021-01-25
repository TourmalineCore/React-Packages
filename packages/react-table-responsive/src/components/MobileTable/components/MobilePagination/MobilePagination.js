import React from 'react';

import './MobilePagination.css';

export default function MobilePagination({
  totalCount,
  setPageSize,
  pageSize,
  languageStrings,
}) {
  const {
    shownLabel,
    ofLabel,
    showMoreLabel,
  } = languageStrings.pagination.mobile;

  return (
    <li className="tc-table-mobile__row tc-table-mobile__row--pagination">
      <div className="tc-table-mobile__counter">
        {`${shownLabel} `}
        <span className="tc-table-mobile__showing">
          {Math.min(totalCount, pageSize)}
        </span>
        {` ${ofLabel} `}
        <span>{totalCount}</span>
      </div>
      {
        canShowMore() && (
          <button
            type="button"
            className="tc-table-mobile__show-more-btn"
            onClick={() => setPageSize(pageSize * 2)}
          >
            {showMoreLabel}
          </button>
        )
      }
    </li>
  );

  function canShowMore() {
    if (totalCount === 0) {
      return false;
    }

    if (totalCount <= pageSize) {
      return false;
    }

    return true;
  }
}
