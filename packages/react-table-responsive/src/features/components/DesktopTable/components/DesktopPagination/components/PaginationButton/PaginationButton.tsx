import { ReactNode } from 'react'

export function PaginationButton({
  children,
  title,
  disabled,
  onClick,
  dataCy,
}: {
  children: ReactNode,
  title: string,
  disabled: boolean,
  onClick: () => unknown,
  dataCy?: string,
}) {
  return (
    <button
      type="button"
      className="tc-table-desktop-pagination-button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      data-cy={dataCy}
    >
      {children}
    </button>
  )
}
