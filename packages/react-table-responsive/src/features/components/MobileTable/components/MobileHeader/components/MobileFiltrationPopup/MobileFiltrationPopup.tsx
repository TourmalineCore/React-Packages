import { Modal } from '@tourmalinecore/react-tc-modal'
import { useState } from 'react'
import {
  ColumnFiltersState, flexRender, Header, Updater,
} from '@tanstack/react-table'
import { ReactComponent as IconFilter } from '../../../../../../../assets/images/icon-filter.svg'
import { I18StringsProps } from '../../../../../../../i18n/types'

export function MobileFiltrationPopup<TData>({
  filterableColumns,
  setColumnFilters,
  onClose,
  languageStrings,
}: {
  filterableColumns: Header<TData, unknown>[],
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => unknown,
  onClose: () => unknown,
  languageStrings: I18StringsProps,
}) {
  const [
    draftFilters,
    setDraftFilters,
  ] = useState(filterableColumns.map((column) => ({
    id: column.column.columnDef.id,
    value: column.column.getFilterValue(),
  })))

  const {
    titleLabel,
  } = languageStrings.filtration

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<IconFilter />}
      content={(
        <div className="tc-table-mobile-filtration">
          {
            filterableColumns
              .map((column) => (
                <div
                  key={`filter-${column.id}`}
                  className="tc-table-mobile-filtration__column"
                >
                  <div className="tc-table-mobile-filtration__title">
                    {
                      flexRender(
                        column.column.columnDef.header,
                        {
                          ...column.getContext(),
                        },
                      )
                    }
                  </div>
                  <div className="tc-table-mobile-filtration__field">
                    {
                      flexRender(
                        column.column.columnDef.Filter,
                        {
                          ...column.getContext(),
                          ...column.column.columnDef.tcInputFilterProps,
                          filterValueOverride: draftFilters.find((draftFilter) => draftFilter.id === column.id)!.value,
                          setFilterOverride: onDraftFilterChange,
                        },
                      )
                    }
                  </div>
                </div>
              ))
          }
        </div>
      )}
      onClose={onClose}
      showApply
      onApply={onApply}
      showCancel
      language={languageStrings.langKey}
    />
  )

  function onDraftFilterChange(columnId: string, newFilterValue: string) {
    setDraftFilters(draftFilters.map((draftFilter) => (draftFilter.id === columnId
      ? {
        ...draftFilter,
        value: newFilterValue,
      }
      : draftFilter
    )))
  }

  function onApply() {
    setColumnFilters(draftFilters as { id: string, value: unknown, }[])
    onClose()
  }
}
