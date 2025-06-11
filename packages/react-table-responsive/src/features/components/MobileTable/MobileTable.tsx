import { MobileFooter } from './components/MobileFooter/MobileFooter'
import { MobileBody } from './components/MobileBody/MobileBody'
import { Loader } from '../../../components/Loader/Loader'
import { MobileHeader } from './components/MobileHeader/MobileHeader'
import { NoRecords } from '../../../components/NoRecords/NoRecords'
import { MobilePagination } from './components/MobilePagination/MobilePagination'
import { MobileTableProps } from '../../../types/types'

export function MobileTable<TData>({
  getRowModel,
  getFlatHeaders,
  tcRenderMobileTitle,
  setColumnFilters,
  getState,
  setPageSize,
  getRowCount,
  noFooter,
  loading,
  setSorting,
  actions,
  languageStrings,
}: MobileTableProps<TData>) {
  const rowsIsEmpty = getRowModel().rows.length === 0

  return (
    <div
      className="tc-table-mobile"
      data-cy="table-mobile"
    >
      <div className="tc-table-mobile__content">

        <MobileHeader<TData>
          sortBy={getState().sorting}
          flatHeaders={getFlatHeaders()}
          languageStrings={languageStrings}
          filters={getState().columnFilters}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
        />

        <MobileBody<TData>
          actions={actions}
          rows={getRowModel().rows}
          tcRenderMobileTitle={tcRenderMobileTitle}
        />

        <NoRecords
          isShow={rowsIsEmpty}
          languageStrings={languageStrings}
        />

        {
          !noFooter && (
          <MobileFooter<TData>
            flatHeaders={getFlatHeaders()}
            languageStrings={languageStrings}
          />
          )
        }

        <MobilePagination
          totalCount={getRowCount()}
          setPageSize={setPageSize}
          pageSize={getState().pagination.pageSize}
          languageStrings={languageStrings}
        />

      </div>

      <Loader
        loading={loading}
        languageStrings={languageStrings}
      />
    </div>
  )
}
