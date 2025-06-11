import { useRef, useState } from 'react'
import { Row } from '@tanstack/react-table'
import ReactDOM from 'react-dom'
import { useOnClickOutside } from '../../features/hooks/useOnClickOutside'
import { getRelativePosition } from '../../features/utils/getRelativePosition'
import { getTableById } from '../../features/components/DesktopTable/helpers'
import { ActionsType } from '../../types/types'

export function ActionsDropdown<TData>({
  tableId,
  actions,
  rowWithValues,
}: {
  tableId: string,
  actions: ActionsType<TData>,
  rowWithValues: Row<TData>,
}) {
  const dropdownContainer = useRef<HTMLDivElement | null>(null)
  const dropdownList = useRef<HTMLDivElement | null>(null)

  const [
    isOpened,
    setIsOpened,
  ] = useState(false)

  useOnClickOutside({
    refs: [
      dropdownContainer,
      dropdownList,
    ],
    handler: () => setIsOpened(false),
  })

  return (
    <div
      ref={dropdownContainer}
      className="tc-table-desktop-actions-dropdown"
    >
      <button
        type="button"
        className="tc-table-desktop-actions-dropdown__button"
        data-cy="table-dropdown-button"
        onClick={() => setIsOpened(!isOpened)}
      >
        <span />
      </button>

      {isOpened && ReactDOM.createPortal(
        <div
          ref={dropdownList}
          style={{
            top: getRelativePosition({
              tableId,
              targetElem: dropdownContainer,
            }).top + dropdownContainer.current!.offsetHeight / 2,
          }}
          className="tc-table-desktop-actions-dropdown__list"
          data-cy="table-dropdown-list"
        >
          {
            actions
              .filter((action) => action.show(rowWithValues))
              .map((action) => (
                <button
                  key={`${action.name}-${rowWithValues.id}`}
                  type="button"
                  className="tc-table-desktop-actions-dropdown__action"
                  data-cy="table-dropdown-action"
                  onClick={(e) => {
                    setIsOpened(!isOpened)

                    if (action.onClick) {
                      action.onClick(e, rowWithValues)
                    }
                  }}
                >
                  {
                    action.renderIcon && (
                      <span
                        className="tc-table-desktop-actions-dropdown__action-icon"
                        data-cy="action-icon"
                      >
                        {action.renderIcon(rowWithValues)}
                      </span>
                    )
                  }

                  {action.renderText(rowWithValues)}
                </button>
              ))
          }
        </div>,
        getTableById({
          tableId,
        })!,
      )}
    </div>
  )
}
