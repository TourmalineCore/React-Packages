import { I18StringsProps } from '../types';

const strings: I18StringsProps = {
  langKey: 'ru',

  loadingLabel: 'Загрузка...',
  noRecordsLabel: 'Не найдено подходящих записей',
  totalLabel: 'Итого',
  searchLabel: 'Поиск',
  actionsLabel: '',

  sorting: {
    titleLabel: 'Сортировка',
    columnLabel: 'Сортировать по',
    directionLabel: 'Направление',
    ascLabel: 'По возрастанию',
    descLabel: 'По убыванию',
  },

  filtration: {
    titleLabel: 'Фильтрация',
  },

  pagination: {
    desktop: {
      shownLabel: 'Показаны',
      toLabel: '-',
      ofLabel: 'из',
      showLabel: 'Показать строк',
      noRecordsLabel: 'Нет записей',
      singleRecordLabel: 'Единственная запись',
      firstPageLabel: 'Первая страница',
      previousPageLabel: 'Предыдущая',
      nextPageLabel: 'Следующая',
      lastPageLabel: 'Последняя страница',
    },
    mobile: {
      shownLabel: 'Показаны',
      ofLabel: 'из',
      showMoreLabel: 'Показать еще',
    },
  },
};

export default strings;
