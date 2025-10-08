import { DesktopFooter } from './components/DesktopFooter/DesktopFooter'
import { Loader } from '../../../components/Loader/Loader'
import { DesktopHeader } from './components/DesktopHeader/DesktopHeader'
import { DesktopBody } from './components/DesktopBody/DesktopBody'
import { DesktopPagination } from './components/DesktopPagination/DesktopPagination'
import { DesktopTableProps } from '../../../types/types'

export function DesktopTable<TData>({
  tableId,
  getHeaderGroups,
  getRowModel,
  getFooterGroups,
  noFooter,
  noFilters,
  tcLoading,
  tcIsStriped,
  getState,
  setPageSize,
  tcPageSizeOptions,
  getRowCount,
  firstPage,
  previousPage,
  getCanPreviousPage,
  nextPage,
  lastPage,
  getCanNextPage,
  getPageCount,
  languageStrings,
  totalCount,
}: DesktopTableProps<TData>) {
  return (
    <div
      id={tableId}
      className="tc-table-desktop"
      data-cy="table-desktop"
    >
      <div className="tc-table-desktop__inner">
        <div className="tc-table-desktop__content">
          <DesktopHeader<TData>
            headerGroups={getHeaderGroups()}
            noFilters={noFilters}
          />

          <DesktopBody<TData>
            tcIsStriped={tcIsStriped}
            rows={getRowModel().rows}
            languageStrings={languageStrings}
          />

          {
            !noFooter && (
            <DesktopFooter<TData>
              footerGroups={getFooterGroups()}
            />
            )
          }
        </div>
      </div>

      <DesktopPagination
        tableId={tableId}
        setPageSize={setPageSize}
        pageSize={getState().pagination.pageSize}
        pageIndex={getState().pagination.pageIndex}
        tcPageSizeOptions={tcPageSizeOptions}
        totalCount={totalCount || getRowCount()}
        firstPage={firstPage}
        previousPage={previousPage}
        сanPreviousPage={getCanPreviousPage()}
        nextPage={nextPage}
        lastPage={lastPage}
        canNextPage={getCanNextPage()}
        pageCount={getPageCount()}
        languageStrings={languageStrings}
      />

      <Loader
        loading={tcLoading}
        languageStrings={languageStrings}
      />
    </div>
  )
}
