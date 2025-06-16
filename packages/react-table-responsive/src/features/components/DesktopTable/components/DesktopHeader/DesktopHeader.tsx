import { HeaderGroup } from '@tanstack/react-table'
import { DesktopFilters } from './components/DesktopFilters/DesktopFilters'
import { DesktopHeaderCell } from './components/DesktopHeaderCell/DesktopHeaderCell'
import * as React from 'react'

export function DesktopHeader<TData>({
  headerGroups,
  noFilters,
}: {
  headerGroups: HeaderGroup<TData>[],
  noFilters: boolean,
}) {
  return (
    <div className="tc-table-desktop-header">
      {headerGroups
        .map(
          (headerGroup) => (
            <React.Fragment key={`header-group-wrapper-${headerGroup.id}`}>

              <div
                className="tc-table-desktop-row tc-table-desktop-row--header"
              >
                {headerGroup
                  .headers
                  .map((header) => (
                    <DesktopHeaderCell<TData>
                      key={header.id}
                      headerCell={header}
                    />
                  ))}
              </div>

              {!noFilters && <DesktopFilters<TData> headerGroup={headerGroup} />}

            </React.Fragment>
          ),
        )}
    </div>
  )
}
