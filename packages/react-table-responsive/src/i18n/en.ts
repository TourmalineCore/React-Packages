import { I18StringsProps } from '../types';

const strings: I18StringsProps = {
  langKey: 'en',

  loadingLabel: 'Loading...',
  noRecordsLabel: 'No matching records found',
  totalLabel: 'Total',
  searchLabel: 'Search',
  actionsLabel: '',

  sorting: {
    titleLabel: 'Sorting',
    columnLabel: 'Sort By',
    directionLabel: 'Direction',
    ascLabel: 'Ascending',
    descLabel: 'Descending',
  },

  filtration: {
    titleLabel: 'Filtration',
  },

  pagination: {
    desktop: {
      shownLabel: 'Shown',
      toLabel: '-',
      ofLabel: 'of',
      showLabel: 'Show rows',
      noRecordsLabel: 'No Records',
      singleRecordLabel: 'Single Record',
      firstPageLabel: 'First Page',
      previousPageLabel: 'Previous',
      nextPageLabel: 'Next',
      lastPageLabel: 'Last Page',
    },
    mobile: {
      shownLabel: 'Shown',
      ofLabel: 'of',
      showMoreLabel: 'Show More',
    },
  },
};

export default strings;
