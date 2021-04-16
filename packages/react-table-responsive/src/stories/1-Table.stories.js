import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import SelectColumnFilter from '../components/Filters/SelectColumnFilter';

import { ClientTable } from '..';

export default {
  title: 'Table',
  decorators: [withKnobs],
  component: ClientTable,
};

const someTypes = {
  firstType: 'firstType',
  secondType: 'secondType',
};

const someTypesStrings = {
  firstType: 'First Type',
  secondType: 'Second Type',
};

const all = {
  label: 'All',
  value: '',
};

const someTypesOptions = Object.keys(someTypes).map((x) => ({ label: someTypesStrings[x], value: x }));

export const ClientSideDesktop = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      fontWeight: 300,
      color: '#172f3d',
    }}
  >
    <SineDataTable
      loading={boolean('loading', false)}
      isStriped={boolean('isStriped', false)}
      language={text('Language', 'en')}
    />
  </div>
);

export const ClientSideMobile = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      fontWeight: 300,
      color: '#172f3d',
    }}
  >
    <SineDataTable
      loading={boolean('loading', false)}
      language={text('Language', 'en')}
    />
  </div>
);

ClientSideMobile.parameters = {
  viewport: { defaultViewport: 'iphone5' },
};

const data = [
  {
    actualSales: 5096606.9,
    employee: 'Employee 1',
    calculatedBonus: 2774.4,
    plannedSales: 5593097.36,
    previousSales: 4354489.83,
    targetAchivementPercent: 91.12,
    weight: 25,
    someType: someTypes.firstType,
  },
  {
    actualSales: 21455221.56,
    employee: 'Employee 2',
    calculatedBonus: 7507.2,
    plannedSales: 23126748.43,
    previousSales: 19740627.1,
    targetAchivementPercent: 92.77,
    weight: 32,
    someType: someTypes.secondType,
  },
  {
    actualSales: 7709519.93,
    employee: 'Employee 3',
    calculatedBonus: 36755.2,
    plannedSales: 7385674.05,
    previousSales: 6572816.8,
    targetAchivementPercent: 104.38,
    weight: 12,
    someType: someTypes.firstType,
  },
  {
    actualSales: 12931847.81,
    employee: 'Employee 4',
    calculatedBonus: 36480,
    plannedSales: 12424437.43,
    previousSales: 11570609.21,
    targetAchivementPercent: 104.08,
    weight: 54,
    someType: someTypes.secondType,
  },
  {
    actualSales: 14931847,
    employee: 'Employee 5',
    calculatedBonus: 66480,
    plannedSales: 1242437.43,
    previousSales: 1570609.21,
    targetAchivementPercent: 90,
    weight: 66,
    someType: someTypes.firstType,
  },
];

const actions = [
  {
    name: 'open-dictionaries-action',
    show: () => true,
    renderIcon: () => <FontAwesomeIcon icon={faBook} />,
    renderText: () => 'Open Dictionaries',
    onClick: action('onActionClick'),
  },
  {
    name: 'open-dictionaries1-action',
    show: () => true,
    renderText: () => 'Open Dictionaries',
    onClick: action('onActionClick'),
  },
];

const SineDataTable = ({
  loading,
  language,
  isStriped,
}) => (
  <ClientTable
    tableId="tc-story-bonus-table"
    data={data}
    onFiltersChange={action('onFiltersChange')}
    order={{
      id: 'weight',
      desc: true,
    }}
    language={language}
    renderMobileTitle={(row) => row.original.employee}
    loading={loading}
    isStriped={isStriped}
    enableTableStatePersistance
    actions={actions}
    columns={[
      {
        Header: 'Employee',
        accessor: 'employee',
        // Use our custom `fuzzyText` filter on this column
        filter: 'fuzzyText',
        Cell: ({ row }) => row.original.employee,
        Footer: () => 'Total',
        nonMobileColumn: true,
        principalFilterableColumn: true,
      },
      {
        Header: 'Weight (%)',
        accessor: 'weight',
        width: 140,
        disableFilters: true,
        Footer: () => 100,
      },
      {
        Header: 'Planned',
        accessor: 'plannedSales',
        width: 200,
        disableFilters: true,
        Footer: () => '48 529 957,27',
      },
      {
        Header: 'Previous',
        accessor: 'previousSales',
        width: 200,
        disableSortBy: true,
        disableFilters: true,
        Footer: () => '42 238 542,94',
      },
      {
        Header: 'Actual',
        accessor: 'actualSales',
        width: 200,
        disableSortBy: true,
        disableFilters: true,
        Footer: () => '47 193 196,2',
      },
      {
        Header: 'Target',
        accessor: 'targetAchivementPercent',
        width: 100,
        disableSortBy: true,
        disableFilters: true,
        Footer: () => '97,25',
      },
      {
        Header: 'Forecasting',
        disableFilters: true,
        disableSortBy: true,
        width: 220,
        minWidth: 140,
        id: 'newSlider',
        accessor: 'targetAchivementPercent',
        Cell: () => (<input type="range" min={0} max={100} defaultValue={79} />),
        twoRowsMobileLayout: true,
        noFooterColumn: true,
      },
      {
        Header: 'Bonus',
        id: 'calculatedBonus',
        disableSortBy: true,
        disableFilters: true,
        accessor: (row) => row.forcastedBonus || row.calculatedBonus,
        Cell: (row) => row.value,
        noFooterColumn: true,
      },
      {
        Header: 'Type',
        accessor: 'someType',
        minWidth: 200,
        maxWidth: 400,
        Cell: (cell) => someTypesStrings[cell.value],
        Filter: SelectColumnFilter,
        selectFilterOptions: [all, ...someTypesOptions],
        noFooterColumn: true,
      },
    ]}
  />
);
