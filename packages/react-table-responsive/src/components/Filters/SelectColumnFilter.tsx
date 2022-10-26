import React from 'react';

import Select from '../DesktopTable/components/Select/Select';

export default function SelectColumnFilter({
  column: {
    id,
    filterValue,
    setFilter,
    selectFilterOptions,
  },
  filterValueOverride,
  setFilterOverride,
}: {
  column: {
    id: number | string;
    filterValue: number | string;
    setFilter: (newFilterValue?: string) => void;
    selectFilterOptions: {
      label: number | string;
      value: number | string;
    }[],
  },
  filterValueOverride?: number | string;
  setFilterOverride?: (id: string | number, newFilterValue?: string) => void;
}) {
  return (
    <Select
      value={setFilterOverride ? filterValueOverride || '' : filterValue || ''}
      options={selectFilterOptions}
      onChange={(e) => {
        const newFilterValue = e.target.value;

        if (setFilterOverride) {
          setFilterOverride(id, newFilterValue);
        } else {
          setFilter(newFilterValue);
        }
      }}
    />
  );
}
