import React from 'react';
import NoRecordsIcon from '../../assets/images/no-records.svg';

import './NoRecords.css';

export default function NoRecords({
  languageStrings,
}) {
  const {
    noRecordsLabel,
  } = languageStrings;

  return (
    <div className="tc-table-no-records">
      <img src={NoRecordsIcon} alt={noRecordsLabel} />
      <div className="tc-table-no-records__text">{noRecordsLabel}</div>
    </div>
  );
}
