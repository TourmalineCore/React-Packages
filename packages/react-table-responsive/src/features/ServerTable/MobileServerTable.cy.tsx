import axios from 'axios'
import { ServerTable } from './ServerTable'
import {
  generateTableTestData,
  getColumnsWithProps,
  getFilterInputById,
  getFilterInputByName,
  getTableMobileFiltrationButton,
  getTableMobileRow,
  getTableMobileSortingButton,
  someTypes,
  TestData,
} from '../utils/test-helpers'
import { ServerTableProps } from '../../types'

type TableResponse = {
  list: TestData[],
}

describe('mobileServerTable', () => {
  beforeEach(() => {
    const tableResponse: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      }),
    }

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc',
      tableResponse,
    )
      .as('getTableData')
  })

  describe('initializationData', initializationDataTests)

  describe('sorting', sortingTests)

  describe('filtration', filtrationTests)

  describe('showMore', showMoreTests)
})

function initializationDataTests() {
  test(`
    GIVEN two records from network
    WHEN render the component
    SHOULD see them
`, () => {
    mountComponent()

    cy.wait('@getTableData')

    cy.contains('Test 1')

    cy.contains('Test 2')
  })
}

function sortingTests() {
  test(`
    GIVEN two records from network
    WHEN sorting by name in asc order is enabled
    SHOULD see sorted table contents in asc order by name
`, () => {
    mountComponent()

    cy.wait('@getTableData')

    getTableMobileRow()
      .first()
      .contains('Test 1')
  })

  test(`
    GIVEN two records from network
    WHEN sorting by name in desc order is enabled
    SHOULD see sorted table contents in desc order by name
`, () => {
    const tableResponse: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      })
        .reverse(),
    }

    mountComponent({
      tcOrder: {
        desc: true,
        id: 'name',
      },
    })

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=desc',
      tableResponse,
    )
      .as('getTableData')

    cy.wait('@getTableData')

    getTableMobileRow()
      .first()
      .contains('Test 2')
  })

  test(`
    GIVEN two records from network sorted by name
    WHEN click on mobile menu with sorting type
    AND change it to desc and apply
    SHOULD change sorting direction to desc
`, () => {
    const sortedResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      })
        .reverse(),
    }

    mountComponent()

    cy.wait('@getTableData')

    getTableMobileSortingButton()
      .click()

    cy.contains('Descending')
      .click()

    cy.contains('Apply')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=desc',
      sortedResponseData,
    )
      .as('getSortedResponseData')

    getTableMobileRow()
      .first()
      .contains('Test 2')
  })

  test(`
    GIVEN two records from network sorted by name
    WHEN click on mobile menu with sorting field
    AND change it to id and apply
    SHOULD see records sorted by id
`, () => {
    const sortedResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      }),
    }

    mountComponent()

    cy.wait('@getTableData')

    getTableMobileRow()
      .first()
      .contains('Test 1')

    getTableMobileSortingButton()
      .click()

    cy.contains('Id')
      .click()

    cy.contains('Apply')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=id&orderingDirection=asc',
      sortedResponseData,
    )
      .as('getSortedResponseData')

    cy.wait('@getSortedResponseData')

    getTableMobileRow()
      .first()
      .contains('Test 1')
  })
}

function filtrationTests() {
  test(`
    GIVEN two records from network
    WHEN filtration in name field is enabled
    AND input text "Test 1"
    SHOULD see name field filtered by this text
`, () => {
    const filteredResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 1,
      }),
    }

    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
    })

    cy.wait('@getTableData')

    cy.contains('Test 2')

    getFilterInputByName()
      .type('Test 1')

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc&filteredByColumns=name&filteredByValues=Test%201',
      filteredResponseData,
    )
      .as('getFilteredResponseData')

    cy.wait('@getFilteredResponseData')

    cy.contains('Test 2')
      .should('not.exist')

    cy.contains('Test 1')
  })

  test(`
    GIVEN three records from network
    WHEN filtration in name field is enabled
    AND filtration in id field is also enabled
    AND open filtration popup
    AND input text "Test 1" in name input
    AND input text "1" in id input
    AND click apply button
    SHOULD see name field and id field filtered by these texts
`, () => {
    const tableResponse: TableResponse = {
      list: [
        ...generateTableTestData({
          recordCount: 2,
        }),
        {
          id: '11',
          name: 'Test 11',
          type: someTypes.firstType,
        },
      ],
    }

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc',
      tableResponse,
    )
      .as('getTableData')

    const filteredResponseData: TableResponse = {
      list: [
        ...generateTableTestData({
          recordCount: 1,
        }),
        {
          id: '11',
          name: 'Test 11',
          type: someTypes.firstType,
        },
      ],
    }

    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcInputFilterProps: {
            placeholder: 'Search',
          },
        },
        idColumnProps: {
          enableColumnFilter: true,
          tcInputFilterProps: {
            placeholder: 'Search',
          },
        },
      }),
    })

    cy.wait('@getTableData')

    getTableMobileFiltrationButton()
      .click()

    getFilterInputById()
      .type('1')

    getFilterInputByName()
      .type('Test 1')

    cy.contains('Apply')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc&filteredByColumns=id&filteredByColumns=name&filteredByValues=1&filteredByValues=Test%201',
      filteredResponseData,
    )
      .as('getFilteredResponseData')

    cy.wait('@getFilteredResponseData')

    cy.contains('Test 2')
      .should('not.exist')

    cy.contains('Test 1')
    cy.contains('Test 11')
  })
}

function showMoreTests() {
  test(`
    GIVEN mobile client table with 10 records visible
    WHEN total count of records is 15
    AND page size is 10
    AND click show more button
    SHOULD see 15 records
`, () => {
    const tableResponse: TableResponse = {
      list: generateTableTestData({
        recordCount: 11,
      }),
    }

    const tableResponseWithPageSize15: TableResponse = {
      list: generateTableTestData({
        recordCount: 15,
      }),
    }

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc',
      tableResponse,
    )
      .as('getTableData')

    mountComponent()

    cy.wait('@getTableData')

    getTableMobileRow()
      .should('have.length', 11)

    cy.getByData('table-mobile-show-more')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=20&orderBy=name&orderingDirection=asc',
      tableResponseWithPageSize15,
    )
      .as('getTableDataWithPageSize20')

    cy.wait('@getTableDataWithPageSize20')

    getTableMobileRow()
      .should('have.length', 15)
  })
}

function mountComponent({
  tcOrder = {
    desc: false,
    id: 'name',
  },
  columns = getColumnsWithProps(),
  ...props
}: Partial<ServerTableProps<TestData>> = {}) {
  cy.mount(
    <ServerTable<TestData>
      tableId="server-table"
      columns={columns}
      tcHttpClient={axios}
      tcOrder={tcOrder}
      tcApiHostUrl="https://testhost.com"
      tcDataPath="/table/test"
      tcRenderMobileTitle={((row) => row.original.name)}
      {...props}
    />,
  )
}
