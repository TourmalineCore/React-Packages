import React from 'react';

import Select from '../DesktopTable/components/Select/Select';

export default function SelectColumnFilter({
  column: {
    filterValue,
    setFilter,
    id,
    selectFilterOptions,
  },
  filterValueOverride,
  setFilterOverride,
}) {
  return (
    <Select
      value={setFilterOverride ? filterValueOverride : filterValue}
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
