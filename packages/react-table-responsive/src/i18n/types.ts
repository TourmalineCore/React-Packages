export type I18StringsProps = {
  langKey: string,
  loadingLabel: string,
  noRecordsLabel: string,
  totalLabel: string,
  searchLabel: string,
  actionsLabel: string,
  sorting: {
    titleLabel: string,
    columnLabel: string,
    directionLabel: string,
    ascLabel: string,
    descLabel: string,
  },
  filtration: {
    titleLabel: string,
  },
  pagination: {
    desktop: {
      shownLabel: string,
      toLabel: string,
      ofLabel: string,
      showLabel: string,
      noRecordsLabel: string,
      singleRecordLabel: string,
      firstPageLabel: string,
      previousPageLabel: string,
      nextPageLabel: string,
      lastPageLabel: string,
    },
    mobile: {
      shownLabel: string,
      ofLabel: string,
      showMoreLabel: string,
    },
  },
};
