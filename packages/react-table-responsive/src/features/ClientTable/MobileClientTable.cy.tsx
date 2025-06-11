import { ClientTable } from './ClientTable'
import {
  TestData,
  generateTableTestData,
  getColumnsWithProps,
  getFilterInputByName,
  getTableMobileFiltrationButton,
  getTableMobileRow,
  getTableMobileSortingButton,
  someTypesMetadata,
  someTypesOptions,
} from '../utils/test-helpers'
import { ClientTableProps } from '../../..'
import { SelectColumnFilter } from '../../components/Filters/SelectColumnFilter/SelectColumnFilter'

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
  test(`
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
  test(`
  GIVEN mobile client table
  WHEN language property is 'en'
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

  test(`
  GIVEN mobile client table
  WHEN language property is 'ru'
  AND 'tcNonMobileColumn' props is true 
  SHOULD see footer with Russian translations
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        nameColumnProps: {
          footer: () => <span>Footer Name</span>,
        },
      }),
      language: 'ru',
    })

    cy.contains('Итого')
  })

  test(`
  GIVEN mobile client table
  WHEN language property is 'en'
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

  test(`
  GIVEN mobile client table
  WHEN language property is 'ru'
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
      language: 'ru',
    })

    getFilterInputByName()
      .should('have.attr', 'placeholder', 'Поиск')
  })
}

function initializeSearchInput() {
  test(`
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
  test(`
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

  test(`
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

  test(`
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

  test(`
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
          Filter: SelectColumnFilter,
          selectFilterOptions: [
            {
              label: 'All',
              value: '',
            },
            ...someTypesOptions,
          ],
          cell: (cell) => someTypesMetadata[cell.getValue()],
          header: () => <span>Type</span>,
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

  test(`
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
  test(`
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
  test(`
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

  test(`
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

  test(`
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
  test(`
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
  test(`
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
  test(`
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
  loading,
  tcPageSizeOptions,
  actions,
  language = 'en',
}: Partial<ClientTableProps<TestData>> = {}) {
  cy.mount(
    <ClientTable
      tableId="mobile-test-table"
      data={data}
      columns={columns}
      loading={loading}
      tcRenderMobileTitle={(row) => row.original.name}
      tcPageSizeOptions={tcPageSizeOptions}
      actions={actions}
      language={language}
    />,
  )
}

function getTableMobile() {
  return cy.getByData('table-mobile')
}

function getTableMobileRowTrigger() {
  return cy.getByData('table-mobile-row-trigger')
}
