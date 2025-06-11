import { ReactNode } from 'react'

export function MobileHeaderButton({
  children,
  onClick,
  dataCy,
}: {
  children: ReactNode,
  onClick: () => unknown,
  dataCy?: string,
}) {
  return (
    <button
      className="tc-table-mobile-header__button"
      data-cy={dataCy}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
