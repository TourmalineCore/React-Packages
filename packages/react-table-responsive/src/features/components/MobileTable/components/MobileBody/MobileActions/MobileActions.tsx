import { Row } from '@tanstack/react-table'
import { ActionsType } from '../../../../../../types/types'

export function MobileActions<TData>({
  actions,
  row,
}: {
  actions: ActionsType<TData>,
  row: Row<TData>,
}) {
  return (
    <>
      {
        actions.length > 0
        && (
          <div
            className="tc-table-mobile__actions"
            data-cy="table-mobile-actions"
          >
            {
              actions
                .filter((action) => action.show(row))
                .map((action) => (
                  <button
                    key={`${action.name}-${row.id}`}
                    type="button"
                    className="tc-table-mobile-action"
                    data-cy="table-mobile-action"
                    onClick={(e) => {
                      if (action.onClick) {
                        action.onClick(e, row)
                      }
                    }}
                  >
                    <span className="tc-table-mobile-action__inner">
                      {
                        action.renderIcon && (
                          <span
                            className="tc-table-mobile-action__icon"
                            data-cy="table-mobile-action-icon"
                          >
                            {action.renderIcon(row)}
                          </span>
                        )
                      }
                      <span className="tc-table-mobile-action__label">
                        {action.renderText(row)}
                      </span>
                    </span>
                  </button>
                ))
            }
          </div>
        )
      }
    </>
  )
}
