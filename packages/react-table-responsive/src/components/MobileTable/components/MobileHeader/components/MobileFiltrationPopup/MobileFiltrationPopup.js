import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import { Modal } from '@tourmalinecore/react-tc-modal';

import './MobileFiltrationPopup.css';

export default function MobileFiltrationPopup({
  filterableColumns,
  setAllFilters,
  onClose,
  languageStrings,
}) {
  const [draftFilters, setDraftFilters] = useState(filterableColumns.map((column) => ({ id: column.id, value: column.filterValue })));

  const {
    titleLabel,
  } = languageStrings.filtration;

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<FontAwesomeIcon icon={faFilter} />}
      content={(
        <div className="tc-table-mobile-filtration">
          {
            filterableColumns
              .map((column) => (
                <div key={`filter-${column.id}`} className="tc-table-mobile-filtration__column">
                  <div className="tc-table-mobile-filtration__title">
                    {column.render('Header')}
                  </div>
                  <div className="tc-table-mobile-filtration__field">
                    {
                      column.render('Filter', {
                        filterValueOverride: draftFilters.find((draftFilter) => draftFilter.id === column.id).value,
                        setFilterOverride: onDraftFilterChange,
                      })
                    }
                  </div>
                </div>
              ))
          }
        </div>
      )}
      onClose={onClose}
      showApply
      onApply={onApply}
      showCancel
      language={languageStrings.langKey}
    />
  );

  function onDraftFilterChange(columnId, newFilterValue) {
    setDraftFilters(draftFilters.map((draftFilter) => (draftFilter.id === columnId
      ? { ...draftFilter, value: newFilterValue }
      : draftFilter
    )));
  }

  function onApply() {
    setAllFilters(draftFilters);
    onClose();
  }
}
