import {
  ColumnFiltersState, Header, SortingState, Updater, flexRender,
} from '@tanstack/react-table'
import { ReactNode, useMemo, useState } from 'react'
import { I18StringsProps } from '../../../../../i18n/types'
import { ReactComponent as IconClear } from '../../../../../assets/images/icon-cross.svg'
import { ReactComponent as IconSearch } from '../../../../../assets/images/icon-search.svg'
import { ReactComponent as IconSort } from '../../../../../assets/images/icon-sort.svg'
import { ReactComponent as IconFilter } from '../../../../../assets/images/icon-filter.svg'
import { MobileHeaderButton } from './components/MobileHeaderButton/MobileHeaderButton'
import { MobileSortingPopup } from './components/MobileSortingPopup/MobileSortingPopup'
import { MobileFiltrationPopup } from './components/MobileFiltrationPopup/MobileFiltrationPopup'

export function MobileHeader<TData>({
  flatHeaders,
  languageStrings,
  filters,
  setColumnFilters,
  sortBy,
  setSorting,
}: {
  flatHeaders: Header<TData, unknown>[],
  languageStrings: I18StringsProps,
  filters: ColumnFiltersState,
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => unknown,
  sortBy: SortingState,
  setSorting: (updater: Updater<SortingState>) => unknown,
}) {
  const {
    searchLabel,
  } = languageStrings

  const [
    showFiltersPopup,
    setShowFiltersPopup,
  ] = useState(false)

  const [
    showSortingPopup,
    setShowSortingPopup,
  ] = useState(false)

  const filterableColumns = flatHeaders.filter((header) => header.column.getCanFilter())

  const principalFilter = filterableColumns.find((header) => header.column.columnDef.tcPrincipalFilterableColumn)

  const isPrincipalInputFilled = filters.some((filter) => filter.id === principalFilter?.id)

  const sortableColumns = flatHeaders.filter((header) => header.column.getCanSort())

  const sortingColumnOptions = useMemo(() => sortableColumns.map((header) => ({
    label: flexRender(
      header.column.columnDef.header,
      header.getContext(),
    ),
    value: header.column.columnDef.id,
  })), [
    sortableColumns,
  ])

  return (
    <div
      className="tc-table-mobile-header"
      data-cy="table-mobile-header"
    >
      {
        principalFilter && (
          <>
            <div
              className="tc-table-mobile-header__filter"
              data-cy="table-mobile-header-filter"
            >
              <div>
                {
                  flexRender(
                    principalFilter.column.columnDef.Filter,
                    {
                      ...principalFilter.getContext(),
                      placeholder: searchLabel,
                      className: 'tc-table-mobile-header__filter-input',
                    },
                  )
                }
                <div className="tc-table-mobile-header__filter-icons">
                  {
                    isPrincipalInputFilled
                      ? (
                        <button
                          type="button"
                          className="tc-table-mobile-header__filter-clear-btn"
                          onClick={resetPrincipalFilter}
                        >
                          {/* <IconClear
                            className="tc-table-mobile-header__filter-clear-icon"
                            data-cy="input-clear-icon"
                          /> */}
                          <IconClear />
                        </button>
                      )
                      : (
                    // <IconSearch
                    //   className="tc-table-mobile-header__filter-search-icon"
                    //   data-cy="input-search-icon"
                    // />
                        <IconSearch />
                      )
                  }
                </div>
              </div>
            </div>
          </>
        )
      }
      <>
        {showFiltersPopup
          && (
          <MobileFiltrationPopup
            filterableColumns={filterableColumns}
            setColumnFilters={setColumnFilters}
            languageStrings={languageStrings}
            onClose={() => setShowFiltersPopup(false)}
          />
          )}

        {showSortingPopup
          && (
          <MobileSortingPopup
            columnOptions={sortingColumnOptions as { label: ReactNode, value: string, }[]}
            setSorting={setSorting}
            sortByColumn={sortBy[0]}
            languageStrings={languageStrings}
            onClose={() => setShowSortingPopup(false)}
          />
          )}

        {
          filterableColumns.length > 0
          && (
            <MobileHeaderButton
              dataCy="table-mobile-filtration-button"
              onClick={() => setShowFiltersPopup(true)}
            >
              <IconFilter />
            </MobileHeaderButton>
          )
        }

        {
          sortableColumns.length > 0
          && (
            <MobileHeaderButton
              dataCy="table-mobile-sorting-button"
              onClick={() => setShowSortingPopup(true)}
            >
              <IconSort />
            </MobileHeaderButton>
          )
        }
      </>
    </div>
  )

  function resetPrincipalFilter() {
    const resettedFilters = filters.map((filter) => (
      filter.id === principalFilter?.id
        ? {
          ...filter,
          value: '',
        }
        : filter
    ))

    setColumnFilters(resettedFilters)
  }
}
