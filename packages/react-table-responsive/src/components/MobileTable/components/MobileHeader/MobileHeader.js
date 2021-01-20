import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faSearch } from '@fortawesome/free-solid-svg-icons';

import MobileFiltrationPopup from './components/MobileFiltrationPopup/MobileFiltrationPopup';
import MobileSortingPopup from './components/MobileSortingPopup/MobileSortingPopup';

import './MobileHeader.css';

export default function MobileHeader({
  flatHeaders,
  setAllFilters,
  toggleSortBy,
  sortBy,
  languageStrings,
}) {
  const filterableColumns = flatHeaders.filter((column) => column.canFilter);
  const filterableColumnsCount = filterableColumns.length;

  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const sortableColumns = flatHeaders.filter((column) => column.canSort);
  const sortableColumnsCount = sortableColumns.length;

  const [showSortingPopup, setShowSortingPopup] = useState(false);

  const {
    searchLabel,
  } = languageStrings;

  const principalFilter = filterableColumns.find((column) => column.principalFilterableColumn);

  return (
    <div className="tc-table-mobile__header">
      <div className="tc-table-mobile__filter-wrapper">
        {
          principalFilter
          && principalFilter.render('Filter', { inputPlaceholder: searchLabel })
        }
        <FontAwesomeIcon
          icon={faSearch}
          className="tc-table-mobile__filter-icon"
        />
      </div>

      {
        showFiltersPopup
        && (
        <MobileFiltrationPopup
          filterableColumns={filterableColumns}
          setAllFilters={setAllFilters}
          languageStrings={languageStrings}
          onClose={() => setShowFiltersPopup(false)}
        />
        )
      }

      {
        showSortingPopup
        && (
        <MobileSortingPopup
          sortableColumns={sortableColumns}
          toggleSortBy={toggleSortBy}
          sortByColumn={sortBy[0]}
          languageStrings={languageStrings}
          onClose={() => setShowSortingPopup(false)}
        />
        )
      }

      {
        filterableColumnsCount > 1
        && (
        <button
          className="tc-table-mobile__header-button"
          type="button"
          onClick={() => setShowFiltersPopup(true)}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
        )
      }

      {
        sortableColumnsCount > 0
        && (
        <button
          className="tc-table-mobile__header-button"
          type="button"
          onClick={() => setShowSortingPopup(true)}
        >
          <FontAwesomeIcon icon={faSort} />
        </button>
        )
      }
    </div>
  );
}
