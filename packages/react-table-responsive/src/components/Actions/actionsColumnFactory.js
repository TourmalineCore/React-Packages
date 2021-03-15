import React from 'react';

import ActionsDropdown from '../DesktopTable/components/ActionsDropdown/ActionsDropdown';

export const ACTIONS_COLUMN_ID = 'actions-column';

export default function createActionsColumn(actions, languageStrings) {
  const {
    actionsLabel,
  } = languageStrings;

  return {
    id: ACTIONS_COLUMN_ID,
    Header: actionsLabel,
    disableFilters: true,
    disableSortBy: true,
    nonMobileColumn: true,
    noFooterColumn: true,
    minWidth: 74,
    width: 74,
    maxWidth: 74,
    Cell: (row) => {
      // this row.row || row handles desktop and mobile cases of Cell call
      const rowWithValues = row.row || row;

      return (
        <ActionsDropdown
          tableContainerRef={row.tableContainerRef}
          actions={actions}
          rowWithValues={rowWithValues}
        />
      );
    },
  };
}
