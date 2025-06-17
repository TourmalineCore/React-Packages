import { ClientTable } from './ClientTable'
import { SelectColumnFilter } from '../../components/Filters/SelectColumnFilter/SelectColumnFilter'
import { ClientTableProps } from '../../types/types'
import {
  generateTableTestData,
  getColumnsWithProps,
  getFilterInputByName,
  getTableMobileFiltrationButton,
  getTableMobileRow,
  getTableMobileSortingButton,
  someTypesMetadata,
  someTypesOptions,
  TestData,
} from '../utils/test-helpers'

describe('mobileClientTable', () => {
  describe('initialization', () => {
    describe('initializeBasicComponent', initializeBasicComponentTests)

    describe('initializeTranslation', initializeTranslationTests)

    describe('initializeSearchInput', initializeSearchInput)
  })

  describe('filter', filterTests)

  describe('recordAccordionClick', recordAccordionClickTests)

  describe('styling', stylingTests)

  describe('footer', footerTests)

  describe('sorting', sortingTests)

  describe('showMore', showMoreTests)
})

function initializeBasicComponentTests() {
  it(`
  GIVEN mobile client table
  WHEN render the basic component
  SHOULD see it
`, () => {
    mountComponent()

    getTableMobile()
      .should('exist')

    cy.contains('Test 1')

    cy.getByData('table-mobile-header')
      .should('exist')
  })
}

function initializeTranslationTests() {
  it(`
  GIVEN mobile client table
  WHEN tcLanguage property is 'en'
  AND 'tcNonMobileColumn' props is true 
  SHOULD see footer with English translations
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          footer: () => <span>Footer Name</span>,
        },
      }),
    })

    cy.contains('Total')
  })

  it(`
  GIVEN mobile client table
  WHEN tcLanguage property is 'ru'
  AND 'tcNonMobileColumn' props is true 
  SHOULD see footer with Russian translations
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          footer: () => <span>Footer Name</span>,
        },
      }),
      tcLanguage: 'ru',
    })

    cy.contains('Итого')
  })

  it(`
  GIVEN mobile client table
  WHEN tcLanguage property is 'en'
  AND 'tcPrincipalFilterableColumn' flag is true
  SHOULD see search placeholder with English translations
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
    })

    getFilterInputByName()
      .should('have.attr', 'placeholder', 'Search')
  })

  it(`
  GIVEN mobile client table
  WHEN tcLanguage property is 'ru'
  AND 'tcPrincipalFilterableColumn' flag is true
  SHOULD see search placeholder with Russian translations
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
      tcLanguage: 'ru',
    })

    getFilterInputByName()
      .should('have.attr', 'placeholder', 'Поиск')
  })
}

function initializeSearchInput() {
  it(`
  GIVEN mobile client table
  WHEN at least one column is filterable
  AND 'tcPrincipalFilterableColumn' flag is true
  SHOULD see that the search input has been rendered
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
    })

    cy.getByData('table-mobile-header-filter')
      .should('exist')

    cy.getByData('input-search-icon')
      .should('exist')
  })
}

function filterTests() {
  it(`
    GIVEN mobile table 
    WHEN filtration is disabled
    SHOULD not see filter button in table header
  `, () => {
    mountComponent()

    getTableMobileFiltrationButton()
      .should('not.exist')
  })

  it(`
  GIVEN mobile client table
  WHEN 'tcPrincipalFilterableColumn' flag is true
  AND write the value 'Test 2' in the filter input field
  SHOULD table will be filtered by value 'Test 2'
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
    })

    getFilterInputByName()
      .type('Test 2')

    getTableMobile()
      .contains('Test 2')

    getTableMobile()
      .contains('Test 1')
      .should('not.exist')
  })

  it(`
  GIVEN mobile client table
  WHEN 'tcPrincipalFilterableColumn' flag is true
  AND write the value 'Test 2' in the filter input field
  AND click on the clear button in the search input
  SHOULD see clear input search
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
    })

    getFilterInputByName()
      .type('Test 2')

    cy.getByData('input-clear-icon')
      .click()

    getFilterInputByName()
      .should('have.value', '')
  })

  it(`
  GIVEN unfiltered mobile client table
  WHEN open the filtering popup
  AND write filtration condition for name column
  AND click apply button
  SHOULD see filtered table data
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
        },
      }),
    })

    cy.contains('Test 1')

    cy.contains('Test 2')

    getTableMobileFiltrationButton()
      .click()

    getFilterInputByName()
      .type('Test 2')

    cy.contains('Apply')
      .click()

    cy.contains('Test 2')

    cy.contains('Test 1')
      .should('not.exist')
  })

  it(`
  GIVEN unfiltered mobile client  table 
  WHEN open the filtering popup
  AND select filtration condition for type column
  AND click apply button
  SHOULD see filtered table data
`, () => {
    mountComponent({
      columns: [
        ...getColumnsWithProps({
          nameColumnProps: {
            enableColumnFilter: true,
          },
        }),
        {
          id: 'type',
          accessorFn: (row) => row.type,
          tcFilter: SelectColumnFilter,
          tcSelectFilterOptions: [
            {
              label: 'All',
              value: '',
            },
            ...someTypesOptions,
          ],
          cell: (cell) => someTypesMetadata[cell.getValue()],
          header: () => <span>Type</span>,
          enableColumnFilter: true,
        },
      ],
    })

    cy.contains('Test 1')

    cy.contains('Test 2')

    getTableMobileFiltrationButton()
      .click()

    cy.getByData('table-select-type')
      .select('1')

    cy.contains('Apply')
      .click()

    cy.contains('Test 1')

    cy.contains('Test 2')
      .should('not.exist')
  })

  it(`
  GIVEN mobile client table
  WHEN 'tcPrincipalFilterableColumn' flag is true
  AND write the value 'Non-existing record' in the filter input field
  SHOULD see no records message
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          enableColumnFilter: true,
          tcPrincipalFilterableColumn: true,
        },
      }),
    })

    getFilterInputByName()
      .type('Non-existing record')

    cy.contains('No matching records found')
  })
}

function recordAccordionClickTests() {
  it(`
  GIVEN mobile client table
  WHEN click on first record
  AND click on it once again
  SHOULD see this record's information first showing and then hidden
`, () => {
    mountComponent()

    getTableMobileRowTrigger()
      .first()
      .click()

    cy.contains('name')

    getTableMobileRowTrigger()
      .first()
      .click()

    cy.contains('name')
      .should('not.exist')
  })
}

function stylingTests() {
  it(`
  GIVEN mobile client table 
  WHEN 'tcNonMobileColumn' props is true for id column
  AND click on the first record
  SHOULD id column is not rendered
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          tcNonMobileColumn: true,
        },
      }),
    })

    getTableMobileRowTrigger()
      .first()
      .click()

    cy.contains('id')
      .should('not.exist')
  })

  it(`
  GIVEN mobile client table
  WHEN 'tcTwoRowsMobileLayout' props is true
  AND click on the first record
  SHOULD see id column in vertical mode
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          tcTwoRowsMobileLayout: true,
        },
      }),
    })

    getTableMobileRowTrigger()
      .first()
      .click()

    cy.getByData('table-mobile-row-vertical')
      .contains('id')
      .should('exist')
  })

  it(`
  GIVEN mobile client table 
  WHEN 'tcNoFooterColumn' props is true for id column
  SHOULD id column not render in footer
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          tcNoFooterColumn: true,
          footer: () => <span>Footer Id</span>,
        },
        nameColumnProps: {
          footer: () => <span>Footer Name</span>,
        },
      }),
    })

    cy.getByData('table-mobile-label')
      .contains('id')
      .should('not.exist')
  })
}

function footerTests() {
  it(`
  GIVEN mobile client table with footer
  WHEN render the component
  SHOULD see them
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          footer: () => <span>Footer Id</span>,
        },
        nameColumnProps: {
          footer: () => <span>Footer Name</span>,
        },
      }),
    })

    cy.contains('Total')

    cy.contains('Footer Id')

    cy.contains('Footer Name')
  })
}

function sortingTests() {
  it(`
  GIVEN mobile client table with asc order for Id column
  WHEN open the sorting popup
  AND change sorting order to desc and column to sort from Id to Name
  AND click apply button
  SHOULD see desc order in table
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          enableSorting: true,
        },
        nameColumnProps: {
          enableSorting: true,
        },
      }),
    })

    getTableMobileRow()
      .first()
      .contains('Test 1')

    getTableMobileSortingButton()
      .click()

    cy.contains('Name')
      .click()

    cy.contains('Descending')
      .click()

    cy.contains('Apply')
      .click()

    getTableMobileRow()
      .first()
      .contains('Test 2')
  })
}

function showMoreTests() {
  it(`
  GIVEN mobile client table with 5 records visible
  WHEN total count of records is 10
  AND page size is 5
  AND click show more button
  SHOULD see 10 records
`, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 10,
      }),
      tcPageSizeOptions: [
        5,
      ],
    })

    getTableMobileRow()
      .should('have.length', 5)

    cy.getByData('table-mobile-show-more')
      .click()

    getTableMobileRow()
      .should('have.length', 10)
  })
}

function mountComponent({
  data = generateTableTestData({
    recordCount: 2,
  }),
  columns = getColumnsWithProps(),
  tcLoading,
  tcPageSizeOptions,
  tcActions,
  tcLanguage = 'en',
}: Partial<ClientTableProps<TestData>> = {}) {
  cy.mount(
    <ClientTable
      tableId="mobile-test-table"
      data={data}
      columns={columns}
      tcLoading={tcLoading}
      tcRenderMobileTitle={(row) => row.original.name}
      tcPageSizeOptions={tcPageSizeOptions}
      tcActions={tcActions}
      tcLanguage={tcLanguage}
    />,
  )
}

function getTableMobile() {
  return cy.getByData('table-mobile')
}

function getTableMobileRowTrigger() {
  return cy.getByData('table-mobile-row-trigger')
}
