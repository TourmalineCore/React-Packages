// ToDo update Modal to 18.*.* React version before publishing
import { Modal } from '@tourmalinecore/react-tc-modal'
import { CheckField } from '@tourmalinecore/react-tc-ui-kit'

import { ReactNode, useMemo, useState } from 'react'
import { ColumnSort, SortingState, Updater } from '@tanstack/react-table'
import { I18StringsProps } from '../../../../../../../i18n/types'
import { IconSort } from '../../../../../../../components/Icons/IconSort'

export function MobileSortingPopup({
  onClose,
  languageStrings,
  sortByColumn,
  columnOptions,
  setSorting,
}: {
  onClose: () => unknown,
  languageStrings: I18StringsProps,
  sortByColumn: ColumnSort,
  columnOptions: {
    label: ReactNode,
    value: string,
  }[],
  setSorting: (updater: Updater<SortingState>) => unknown,
}) {
  const {
    titleLabel,
    ascLabel,
    descLabel,
  } = languageStrings.sorting

  const [
    draftSortById,
    setDraftSortById,
  ] = useState(sortByColumn.id)

  const [
    draftSortByDesc,
    setSortByDesc,
  ] = useState(sortByColumn.desc.toString())

  const directionOptions = useMemo(() => [
    {
      label: ascLabel,
      value: 'false',
    },
    {
      label: descLabel,
      value: 'true',
    },
  ], [
    languageStrings.langKey,
  ])

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<IconSort />}
      content={(
        <div
          className="tc-table-mobile-sorting"
          data-cy="table-mobile-sorting-popup"
        >
          <div className="tc-table-mobile-sorting__section">
            {
              columnOptions.map((option) => (
                <CheckField
                  key={option.value}
                  className="tc-table-mobile-sorting__checkfield"
                  viewType="radio"
                  label={option.label}
                  checked={draftSortById === option.value}
                  onChange={() => setDraftSortById(option.value)}
                />
              ))
            }
          </div>
          <div className="tc-table-mobile-sorting__section">
            {
              directionOptions.map((option) => (
                <CheckField
                  key={option.value}
                  className="tc-table-mobile-sorting__checkfield"
                  viewType="radio"
                  label={option.label}
                  checked={draftSortByDesc === option.value}
                  onChange={() => setSortByDesc(option.value)}
                />
              ))
            }
          </div>
        </div>
      )}
      showApply
      onApply={onApply}
      showCancel
      onClose={onClose}
      language={languageStrings.langKey}
    />
  )

  function onApply() {
    setSorting([
      {
        id: draftSortById,
        desc: draftSortByDesc === 'true',
      },
    ])

    onClose()
  }
}
