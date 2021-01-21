import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import { Modal } from '@tourmalinecore/react-tc-modal';

import CheckField from '../../../../../CheckField/CheckField';

import './MobileSortingPopup.css';

export default function MobileSortingPopup({
  sortableColumns,
  toggleSortBy,
  sortByColumn,
  onClose,
  languageStrings,
}) {
  const [draftSortById, setDraftSortById] = useState(sortByColumn.id);
  const [draftSortByDesc, setSortByDesc] = useState(sortByColumn.desc.toString());

  const columnOptions = useMemo(() => sortableColumns.map((column) => ({ label: column.render('Header'), value: column.id })), [sortableColumns]);

  const {
    titleLabel,
    ascLabel,
    descLabel,
  } = languageStrings.sorting;

  const directionOptions = useMemo(() => [
    { label: ascLabel, value: 'false' },
    { label: descLabel, value: 'true' },
  ], [languageStrings.langKey]);

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<FontAwesomeIcon icon={faSort} />}
      content={(
        <div className="tc-table-mobile-sorting">
          <div className="tc-table-mobile-sorting__section">
            {
              columnOptions.map((option) => (
                <CheckField
                  key={option.value}
                  className="tc-table-mobile-sorting__checkfield"
                  label={option.label}
                  checked={draftSortById === option.value}
                  onChange={() => setDraftSortById(option.value)}
                />
              ))
            }
          </div>
          <div className="tc-table-mobile-sorting__section">
            {
              directionOptions.map((option) => (
                <CheckField
                  key={option.value}
                  className="tc-table-mobile-sorting__checkfield"
                  label={option.label}
                  checked={draftSortByDesc === option.value}
                  onChange={() => setSortByDesc(option.value)}
                />
              ))
            }
          </div>
        </div>
      )}
      onClose={onClose}
      showApply
      onApply={onApply}
      showCancel
      language={languageStrings.langKey}
    />
  );

  function onApply() {
    toggleSortBy(draftSortById, draftSortByDesc === 'true');
    onClose();
  }
}
