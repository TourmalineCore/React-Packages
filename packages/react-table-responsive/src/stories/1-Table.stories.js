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
  <SineDataTable
    loading={boolean('loading', false)}
    language={text('Language', 'en')}
  />
);

export const ClientSideMobile = () => (
  <SineDataTable
    loading={boolean('loading', false)}
    language={text('Language', 'en')}
  />
);

ClientSideMobile.parameters = {
  viewport: { defaultViewport: 'iphone5' },
};

const data = [
  {
    actualSales: 5096606.9,
    bonusObject: 'CARDIO',
    bonusObjectType: 'BusinessUnit',
    calculatedBonus: 2774.4,
    plannedSales: 5593097.36,
    previousSales: 4354489.83,
    targetAchivementPercent: 91.12,
    weight: 25,
    weightForSorting: '025,00-CARDIO',
    someType: someTypes.firstType,
  },
  {
    actualSales: 21455221.56,
    bonusObject: 'CNS',
    bonusObjectType: 'BusinessUnit',
    calculatedBonus: 7507.2,
    plannedSales: 23126748.43,
    previousSales: 19740627.1,
    targetAchivementPercent: 92.77,
    weight: 25,
    weightForSorting: '025,00-CNS',
    someType: someTypes.secondType,
  },
  {
    actualSales: 7709519.93,
    bonusObject: 'GYNO',
    bonusObjectType: 'BusinessUnit',
    calculatedBonus: 36755.2,
    plannedSales: 7385674.05,
    previousSales: 6572816.8,
    targetAchivementPercent: 104.38,
    weight: 25,
    weightForSorting: '025,00-GYNO',
    someType: someTypes.firstType,
  },
  {
    actualSales: 12931847.81,
    bonusObject: 'OTC',
    bonusObjectType: 'BusinessUnit',
    calculatedBonus: 36480,
    plannedSales: 12424437.43,
    previousSales: 11570609.21,
    targetAchivementPercent: 104.08,
    weight: 25,
    weightForSorting: '025,00-OTC',
    someType: someTypes.secondType,
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
];

const SineDataTable = ({
  loading,
  language,
}) => (
  <ClientTable
    tableId="tc-story-bonus-table"
    data={data}
    onFiltersChange={action('onFiltersChange')}
    order={{
      id: 'weightForSorting',
      desc: true,
    }}
    language={language}
    renderMobileTitle={(row) => renderBonusObject(row)}
    loading={loading}
    enableTableStatePersistance
    actions={actions}
    columns={[
      {
        Header: 'Bonus Object',
        accessor: 'bonusObject',
        // Use our custom `fuzzyText` filter on this column
        filter: 'fuzzyText',
        Cell: ({ row }) => renderBonusObject(row),
        Footer: () => <strong>Total</strong>,
        nonMobileColumn: true,
        principalFilterableColumn: true,
      },
      {
        Header: 'Weight (%)',
        accessor: 'weightForSorting',
        width: 80,
        disableFilters: true,
        Footer: () => 100,
      },
      {
        Header: 'Planned (₽)',
        accessor: 'plannedSales',
        disableFilters: true,
        Footer: () => '48 529 957,27 ₽',
      },
      {
        Header: 'Previous (₽)',
        accessor: 'previousSales',
        disableSortBy: true,
        disableFilters: true,
        Footer: () => '42 238 542,94 ₽',
      },
      {
        Header: 'Actual (₽)',
        accessor: 'actualSales',
        disableSortBy: true,
        disableFilters: true,
        Footer: () => '47 193 196,2 ₽',
      },
      {
        Header: 'Target (%)',
        accessor: 'targetAchivementPercent',
        width: 80,
        disableSortBy: true,
        disableFilters: true,
        Footer: () => '97,25',
      },
      {
        Header: 'Forecasting',
        disableFilters: true,
        disableSortBy: true,
        width: 260,
        minWidth: 140,
        id: 'newSlider',
        accessor: 'targetAchivementPercent',
        Cell: () => (<input type="range" min={0} max={100} value={79} readOnly />),
        twoRowsMobileLayout: true,
        noFooterColumn: true,
      },
      {
        Header: 'Bonus (₽)',
        id: 'calculatedBonus',
        disableSortBy: true,
        disableFilters: true,
        accessor: (row) => row.forcastedBonus || row.calculatedBonus,
        Cell: (row) => `${row.value} ₽`,
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

function renderBonusObject(row) {
  return (
    <a href="/">
      {row.original.bonusObject}
    </a>
  );
}
