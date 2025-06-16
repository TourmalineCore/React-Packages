import { Cell, Row, flexRender } from '@tanstack/react-table'
import { useState } from 'react'
import { MobileActions } from './MobileActions/MobileActions'
import { ActionsType } from '../../../../../types/types'
import { IconChevronDown } from '../../../../../components/Icons/IconChevronDown'

export function MobileBody<TData>({
  actions,
  rows,
  tcRenderMobileTitle,
}: {
  actions: ActionsType<TData>,
  rows: Row<TData>[],
  tcRenderMobileTitle: (row: Row<TData>) => string,
}) {
  const [
    expandedRowId,
    setExpandedRowId,
  ] = useState<string | null>(null)

  return (
    rows
      .map((row) => (
        <div
          key={row.id}
          className="tc-table-mobile__row"
          data-cy="table-mobile-row"
        >
          <div className="tc-table-mobile__row-header">
            <h2 className="tc-table-mobile__row-title">
              {tcRenderMobileTitle(row)}
            </h2>
            <button
              type="button"
              className="tc-table-mobile__row-trigger"
              data-cy="table-mobile-row-trigger"
              onClick={
                  () => (
                    row.id === expandedRowId
                      ? setExpandedRowId(null)
                      : setExpandedRowId(row.id)
                  )
                }
            >
              <IconChevronDown
                className={
                  `tc-table-mobile__chevron tc-table-mobile__chevron--${row.id === expandedRowId
                    ? 'up'
                    : 'down'
                  }`
                }
              />
            </button>
          </div>

          {
              expandedRowId === row.id && (
                <div className="tc-table-mobile__row-inner">
                  <div className="tc-table-mobile__row-data">
                    {
                      row
                        .getVisibleCells()
                        .filter((cell) => !cell.column.columnDef.tcNonMobileColumn)
                        .map((cell) => (
                          <div
                            key={`${cell.column.id}`}
                            data-cy={`${cell.column.columnDef.tcTwoRowsMobileLayout ? 'table-mobile-row-vertical' : ''}`}
                            className={`
                              tc-table-mobile__row-data-item 
                              ${setVerticalClassName(cell)}
                            `}
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
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )
                              }
                            </div>
                          </div>
                        ))
                    }
                  </div>
                  <MobileActions
                    actions={actions}
                    row={row}
                  />
                </div>
              )
            }
        </div>
      ))
  )
  function setVerticalClassName(cell: Cell<TData, unknown>) {
    return cell.column.columnDef.tcTwoRowsMobileLayout
      ? 'tc-table-mobile__row-data-item--vertical'
      : ''
  }
}
