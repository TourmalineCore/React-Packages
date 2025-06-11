import { Header, flexRender } from '@tanstack/react-table'
import { I18StringsProps } from '../../../../../i18n/types'

export function MobileFooter<TData>({
  flatHeaders,
  languageStrings,
}: {
  flatHeaders: Header<TData, unknown>[],
  languageStrings: I18StringsProps,
}) {
  const {
    totalLabel,
  } = languageStrings

  const filteredFlatHeaders = flatHeaders
    .filter((cell) => !cell.column.columnDef.tcNonMobileColumn)
    .filter((cell) => !cell.column.columnDef.tcNoFooterColumn)

  return (
    <div className="tc-table-mobile__row">
      <div className="tc-table-mobile__row-header">
        <h2 className="tc-table-mobile__row-title">
          {totalLabel}
        </h2>
      </div>
      <div className="tc-table-mobile__row-inner">
        <div className="tc-table-mobile__row-data">
          {
            filteredFlatHeaders.map((cell) => (
              <div
                key={`total-${cell.column.id}`}
                className="tc-table-mobile__row-data-item"
              >
                <div
                  className="tc-table-mobile__label"
                  data-cy="table-mobile-label"
                >
                  {cell.column.id}
                </div>
                <div className="tc-table-mobile__value">
                  {
                    flexRender(
                      cell.column.columnDef.footer,
                      cell.getContext(),
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
