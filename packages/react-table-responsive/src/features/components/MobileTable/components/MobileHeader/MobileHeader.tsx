import {
  ColumnFiltersState, Header, SortingState, Updater, flexRender,
} from '@tanstack/react-table'
import { ReactNode, useMemo, useState } from 'react'
import { I18StringsProps } from '../../../../../i18n/types'
import { MobileHeaderButton } from './components/MobileHeaderButton/MobileHeaderButton'
import { MobileSortingPopup } from './components/MobileSortingPopup/MobileSortingPopup'
import { MobileFiltrationPopup } from './components/MobileFiltrationPopup/MobileFiltrationPopup'
import { IconCross } from '../../../../../components/Icons/IconCross'
import { IconSearch } from '../../../../../components/Icons/IconSearch'
import { IconFilter } from '../../../../../components/Icons/IconFilter'
import { IconSort } from '../../../../../components/Icons/IconSort'

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
                    principalFilter.column.columnDef.tcFilter,
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
                          <IconCross
                            className="tc-table-mobile-header__filter-clear-icon"
                            dataCy="input-clear-icon"
                          />
                        </button>
                      )
                      : (
                        <IconSearch
                          className="tc-table-mobile-header__filter-search-icon"
                          dataCy="input-search-icon"
                        />
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
    const resetFilters = filters.map((filter) => (
      filter.id === principalFilter?.id
        ? {
          ...filter,
          value: '',
        }
        : filter
    ))

    setColumnFilters(resetFilters)
  }
}
