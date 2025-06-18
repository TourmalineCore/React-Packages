import axios from 'axios'
import { ServerTable } from './ServerTable'
import { ServerTableProps } from '../../types/types'
import {
  TestData, generateTableTestData, getTableRow, getColumnsWithProps, getFilterInputByName, someTypes, getFilterInputById, getSelectPagination,
} from '../utils/test-helpers'

type TableResponse = {
  list: TestData[],
  totalCount: number,
}

describe('desktopServerTable', () => {
  beforeEach(() => {
    const tableResponse: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      }),
      totalCount: 2,
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

  describe('pagination', paginationTests)

  describe('requestHeaders', requestHeadersTests)

  describe('requestData', requestDataTests)

  describe('customDataLoader', customDataLoaderTests)

  describe('onPageDataLoaded', onPageDataLoadedTests)

  describe('onFiltersChange', onFiltersChangeTests)
})

function initializationDataTests() {
  it(`
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
  it(`
  GIVEN two records from network
  WHEN sorting by name in asc order is enabled
  SHOULD see sorted table contents in asc order by name
`, () => {
    mountComponent()

    cy.wait('@getTableData')

    getTableRow()
      .first()
      .contains('Test 1')
  })

  it(`
  GIVEN two records from network
  WHEN sorting by name in desc order is enabled
  SHOULD see sorted table contents in desc order by name
`, () => {
    const tableResponse: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      })
        .reverse(),
      totalCount: 2,
    }

    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableSorting: true,
        },
      }),
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

    getTableRow()
      .first()
      .contains('Test 2')
  })

  it(`
  GIVEN two records from network sorted by name
  WHEN click on name cell in header 
  SHOULD change sorting direction to desc
`, () => {
    const sortedResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      })
        .reverse(),
      totalCount: 2,
    }

    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableSorting: true,
        },
      }),
    })

    cy.wait('@getTableData')

    getTableRow()
      .first()
      .contains('Test 1')

    cy.contains('Name')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=desc',
      sortedResponseData,
    )
      .as('getSortedResponseData')

    cy.wait('@getSortedResponseData')

    getTableRow()
      .first()
      .contains('Test 2')
  })

  it(`
  GIVEN two records from network sorted by name
  WHEN click on id cell in header 
  SHOULD see records sorted by id
`, () => {
    const sortedResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 2,
      }),
      totalCount: 2,
    }

    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          enableSorting: true,
        },
      }),
    })

    cy.wait('@getTableData')

    getTableRow()
      .first()
      .contains('Test 1')

    cy.contains('Id')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=id&orderingDirection=asc',
      sortedResponseData,
    )
      .as('getSortedResponseData')

    cy.wait('@getSortedResponseData')

    getTableRow()
      .first()
      .contains('Test 1')
  })
}

function filtrationTests() {
  it(`
  GIVEN two records from network
  WHEN filtration in name field is enabled
  AND input text "Test 1"
  SHOULD see name field filtered by this text
`, () => {
    const filteredResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 1,
      }),
      totalCount: 2,
    }

    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcInputFilterProps: {
            placeholder: 'Search',
          },
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

  it(`
    GIVEN three records from network
    WHEN filtration in name field is enabled
    AND filtration in id field is also enabled
    AND input text "Test 1" in name input
    AND input text "1" in id input
    SHOULD see name field and id field filtered by these texts
`, () => {
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
      totalCount: 2,
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

    getFilterInputByName()
      .type('Test 1')

    getFilterInputById()
      .type('1')

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc&filteredByColumns=name&filteredByColumns=id&filteredByValues=Test%201&filteredByValues=1',
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

function paginationTests() {
  it(`
  GIVEN eleven records from network
  WHEN change page size from 10 to 20
  SHOULD see eleven records on the page
`, () => {
    const tableResponseWithPageSize10: TableResponse = {
      list: generateTableTestData({
        recordCount: 10,
      }),
      totalCount: 11,
    }

    const tableResponseWithPageSize20 = {
      list: generateTableTestData({
        recordCount: 11,
      }),
      totalCount: 11,
    }

    mountComponent()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc',
      tableResponseWithPageSize10,
    )
      .as('getTableDataWithPageSize10')

    cy.wait('@getTableDataWithPageSize10')

    getTableRow()
      .should('have.length', 10)

    getSelectPagination()
      .select('20')

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=20&orderBy=name&orderingDirection=asc',
      tableResponseWithPageSize20,
    )
      .as('getTableDataWithPageSize20')

    cy.wait('@getTableDataWithPageSize20')

    getTableRow()
      .should('have.length', 11)
  })

  it(`
  GIVEN eleven records from network
  WHEN change page from 1 to 2
  SHOULD see eleventh record on the page
`, () => {
    const tableResponseFromPage1: TableResponse = {
      list: generateTableTestData({
        recordCount: 10,
      }),
      totalCount: 11,
    }

    const tableResponseFromPage2 = {
      list: [
        {
          id: '11',
          name: 'Test 11',
          type: someTypes.firstType,
        },
      ],
      totalCount: 11,
    }

    mountComponent()

    cy.intercept(
      'GET',
      '**/table/test?draw=**page=1&pageSize=10&orderBy=name&orderingDirection=asc',
      tableResponseFromPage1,
    )
      .as('getTableDataFromPage1')

    cy.wait('@getTableDataFromPage1')

    cy.getByData('next-page-button')
      .click()

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=2&pageSize=10&orderBy=name&orderingDirection=asc',
      tableResponseFromPage2,
    )
      .as('getTableDataFromPage2')

    cy.wait('@getTableDataFromPage2')

    cy.contains('Test 11')
  })
}

function requestHeadersTests() {
  it(`
  GIVEN server table with tcAuthToken prop
  WHEN render the component
  SHOULD request headers include language and authorization
`, () => {
    const authToken = 'token'

    cy.intercept('GET', '**/table/test*', (req) => {
      expect(req.headers).to.include({
        authorization: `Bearer ${authToken}`,
        tcLanguage: 'en',
      })
    })

    mountComponent({
      tcAuthToken: authToken,
    })
  })

  it(`
  GIVEN server table without tcAuthToken prop
  WHEN render the component
  SHOULD request headers include only language
`, () => {
    cy.intercept('GET', '**/table/test*', (req) => {
      expect(req.headers).not.to.have.property('authorization')

      expect(req.headers).to.include({
        tcLanguage: 'en',
      })
    })

    mountComponent()
  })
}

function requestDataTests() {
  it(`
  GIVEN server table with tcRequestData prop
  WHEN render the component
  SHOULD request body includes data from tcRequestData
`, () => {
    cy.intercept('POST', '**/table/test*', async (req) => {
      expect(req.body).to.deep.equal({
        data: 'testData',
      })

      req.reply({
        statusCode: 200,
        body: {
          list: [],
          total: 0,
        },
        headers: {
          'content-type': 'application/json',
        },
      })
    }).as('postTableData')

    mountComponent({
      tcRequestMethod: 'POST',
      tcRequestData: {
        data: 'testData',
      },
    })

    cy.wait('@postTableData')
  })
}

function customDataLoaderTests() {
  it(`
  GIVEN server table with tcCustomDataLoader prop
  WHEN render the component
  SHOULD see table with data from tcCustomDataLoader
`, () => {
    mountComponent({
      tcCustomDataLoader: async () => ({
        data: {
          draw: 1,
          list: [
            {
              id: 1,
              name: 'Test 0',
              type: someTypes.firstType,
            },
          ],
          totalCount: 1,
        },
      }),
    })

    cy.contains('Test 0')
  })
}

function onPageDataLoadedTests() {
  it(`
  GIVEN server table with onPageDataLoaded prop enabled by default
  WHEN render the component
  SHOULD trigger onPageDataLoaded callback
`, () => {
    mountComponent()

    cy.wait('@getTableData')

    cy.get('@onPageDataLoaded')
      .should('have.been.calledOnce')
  })
}

function onFiltersChangeTests() {
  it(`
  GIVEN server table with onFiltersChange prop enabled by default
  WHEN render the component
  SHOULD trigger onFiltersChange callback
`, () => {
    const filteredResponseData: TableResponse = {
      list: generateTableTestData({
        recordCount: 1,
      }),
      totalCount: 2,
    }

    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcInputFilterProps: {
            placeholder: 'Search',
          },
        },
      }),
    })

    cy.wait('@getTableData')

    getFilterInputByName()
      .type('1')

    cy.intercept(
      'GET',
      '**/table/test?draw=**&page=1&pageSize=10&orderBy=name&orderingDirection=asc&filteredByColumns=name&filteredByValues=1',
      filteredResponseData,
    )
      .as('getFilteredResponseData')

    cy.wait('@getFilteredResponseData')

    cy.get('@onFiltersChange')
      .should('have.been.called')
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
  cy.viewport(900, 900)

  const onPageDataLoadedSpy = cy.spy()
    .as('onPageDataLoaded')

  const onFiltersChangeSpy = cy.spy()
    .as('onFiltersChange')

  cy.mount(
    <ServerTable<TestData>
      tableId="server-table"
      columns={columns}
      tcHttpClient={axios}
      tcOrder={tcOrder}
      tcApiHostUrl="http://localhost:5173"
      tcDataPath="/table/test"
      tcRenderMobileTitle={((row) => row.original.name)}
      tcOnPageDataLoaded={onPageDataLoadedSpy}
      tcOnFiltersChange={onFiltersChangeSpy}
      {...props}
    />,
  )
}
