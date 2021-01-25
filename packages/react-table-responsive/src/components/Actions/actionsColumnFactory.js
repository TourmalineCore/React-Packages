import React from 'react';

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
    Cell: (row) => {
      // this row.row || row handles desktop and mobile cases of Cell call
      const rowWithValues = row.row || row;

      return (
        <div style={{ display: 'flex' }}>
          {
            actions
              .filter((action) => action.show(rowWithValues))
              .map((action) => (
                <div
                  key={`${action.name}-${row.id}`}
                  title={action.renderText(rowWithValues)}
                  onClick={(e) => action.onClick(e, rowWithValues)}
                  role="presentation"
                  style={{
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                >
                  {action.renderIcon(rowWithValues)}
                </div>
              ))
          }
        </div>
      );
    },
    alignItems: 'center',
    noFooterColumn: true,
  };
}
