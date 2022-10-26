import React, { useState } from 'react';
import { Modal } from '@tourmalinecore/react-tc-modal';

import { IMobileFiltrationPopup } from '../../../../../../types';
import { ReactComponent as IconFilter } from '../../../../../../assets/images/icon-filter.svg';

import './MobileFiltrationPopup.css';

export default function MobileFiltrationPopup<TableProps extends object = {}>({
  filterableColumns,
  setAllFilters,
  onClose,
  languageStrings,
}: IMobileFiltrationPopup<TableProps>) {
  const [draftFilters, setDraftFilters] = useState(filterableColumns.map((column) => ({ id: column.id, value: column.filterValue })));

  const {
    titleLabel,
  } = languageStrings.filtration;

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<IconFilter />}
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
                        filterValueOverride: draftFilters.find((draftFilter) => draftFilter.id === column.id)?.value,
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

  function onDraftFilterChange(columnId: string | number, newFilterValue: string | number) {
    setDraftFilters(draftFilters.map((draftFilter) => (draftFilter.id === columnId
      ? { ...draftFilter, value: newFilterValue }
      : draftFilter
    )));
  }

  function onApply() {
    setAllFilters?.(draftFilters);

    onClose();
  }
}
