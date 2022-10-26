import React from 'react';

// Define a default UI for filtering
export default function DefaultColumnFilter({
  column: {
    id,
    filterValue,
    setFilter,
  },
  filterValueOverride,
  setFilterOverride,
  inputPlaceholder,
}: {
  column: {
    id: string | number;
    filterValue: string;
    setFilter: (newFilterValue?: string) => void;
  }
  filterValueOverride?: string;
  setFilterOverride?: (id: string | number, newFilterValue?: string) => void;
  inputPlaceholder?: string;
}) {
  return (
    <input
      className="tc-table-filter"
      value={setFilterOverride ? filterValueOverride || '' : filterValue || ''}
      onChange={(e) => {
        const newFilterValue = e.target.value || undefined; // Set undefined to remove the filter entirely

        if (setFilterOverride) {
          setFilterOverride(id, newFilterValue);
        } else {
          setFilter(newFilterValue);
        }
      }}
      style={{
        width: '100%',
        lineHeight: 1,
      }}
      placeholder={inputPlaceholder}
    />
  );
}
