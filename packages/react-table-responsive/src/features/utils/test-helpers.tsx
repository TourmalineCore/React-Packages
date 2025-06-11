/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'

export type TestData = {
  id: string,
  name: string,
  type: string,
}

export const someTypes: {
  [key: string]: string,
} = {
  firstType: '0',
  secondType: '1',
}

export const someTypesMetadata: Record<keyof typeof someTypes, string> = {
  [someTypes.firstType]: 'First Type',
  [someTypes.secondType]: 'Second Type',
} as const

export const someTypesOptions = Object.values(someTypes)
  .map((x) => (
    {
      label: someTypesMetadata[x],
      value: x,
    }))

export function getColumnsWithProps({
  idColumnProps,
  nameColumnProps,
}: {
  idColumnProps?: Partial<ColumnDef<TestData, any>>,
  nameColumnProps?: Partial<ColumnDef<TestData, any>>,
} = {}): ColumnDef<TestData, any>[] {
  return [
    {
      id: 'id',
      accessorFn: (row) => row.id,
      cell: (cellContext) => (
        <i>
          {cellContext.getValue()}
        </i>
      ),
      enableColumnFilter: false,
      header: () => <span>Id</span>,
      ...idColumnProps,
    },
    {
      id: 'name',
      accessorFn: (row) => row.name,
      cell: (cellContext) => (
        <i>
          {cellContext.getValue()}
        </i>
      ),
      enableColumnFilter: false,
      header: () => <span>Name</span>,
      ...nameColumnProps,
    },
  ]
}

export function generateTableTestData({
  recordCount,
}: {
  recordCount: number,
}) {
  const result = []

  for (let i = 1; i <= recordCount; i++) {
    result.push({
      id: `${i}`,
      name: `Test ${i}`,
      type: i % 2 === 0
        ? someTypes.firstType
        : someTypes.secondType,
    })
  }

  return result
}

export function getFilterInputByName() {
  return cy.getByData('table-filter-input-name')
}

export function getFilterInputById() {
  return cy.getByData('table-filter-input-id')
}

export function getSelectPagination() {
  return cy.getByData('table-select-pagination')
}

export function getTableRow() {
  return cy.getByData('table-row')
}

export function getTableMobileRow() {
  return cy.getByData('table-mobile-row')
}

export function getTableMobileFiltrationButton() {
  return cy.getByData('table-mobile-filtration-button')
}

export function getTableMobileSortingButton() {
  return cy.getByData('table-mobile-sorting-button')
}
