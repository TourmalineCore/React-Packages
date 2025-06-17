import { SelectColumnFilter } from '../../components/Filters/SelectColumnFilter/SelectColumnFilter'
import { ClientTableProps } from '../../types/types'
import {
  generateTableTestData, getColumnsWithProps, getFilterInputById, getFilterInputByName, getSelectPagination, getTableRow, someTypesMetadata, someTypesOptions, TestData,
} from '../utils/test-helpers'
import { ClientTable } from './ClientTable'

describe('desktopClientTable', () => {
  describe('initialization', () => {
    describe('initializeBasicComponent', initializeBasicComponentTests)

    describe('initializeTranslation', initializeTranslationTests)
  })

  describe('styling', stylingTests)

  describe('sorting', sortingTests)

  describe('filter', filterTests)

  describe('footer', footerTests)

  describe('pagination', paginationTests)

  describe('actions', actionsTests)

  describe('onFiltersChange', onFiltersChangeTests)

  describe('localStorage', localStorageTests)
})

function initializeBasicComponentTests() {
  it(`
  GIVEN desktop client table
  WHEN render the basic component
  SHOULD see it
`, () => {
    mountComponent()

    cy.getByData('table-desktop')
      .should('exist')

    cy.contains('Id')
      .should('exist')

    cy.contains('Name')
      .should('exist')

    cy.getByData('table-pagination')
      .should('exist')

    getPaginationPageCount()
      .should('exist')

    getTablePaginationShowRecords()
      .should('exist')

    cy.getByData('table-pagination-buttons')
      .should('exist')

    cy.get('.tc-table-desktop-pagination-button')
      .should('have.length', 4)

    cy.getByData('table-pagination-page-current')
      .should('exist')

    getPaginationOfTotal()
      .should('exist')
  })
}

function initializeTranslationTests() {
  it(`
  GIVEN desktop client table
  WHEN tcLanguage property is 'en'
  AND table data has one record
  SHOULD see table with English translations
`, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 1,
      }),
    })

    getTablePaginationShowRecords()
      .contains('Single Record')
  })

  it(`
  GIVEN desktop client table
  WHEN tcLanguage property is 'en'
  AND table data is not empty
  SHOULD see table with English translations
`, () => {
    mountComponent()

    getPaginationPageCount()
      .contains('Show rows')

    getTablePaginationShowRecords()
      .contains('Shown')
      .contains('of')

    getPaginationOfTotal()
      .contains('of')
  })

  it(`
  GIVEN desktop client table
  WHEN tcLanguage property is 'en'
  AND table data is empty
  SHOULD see table with English translations
`, () => {
    mountComponent({
      data: [],
    })

    getTablePaginationShowRecords()
      .contains('No Records')
  })

  it(`
  GIVEN desktop client table
  WHEN tcLanguage property is 'ru'
  AND table data is not empty
  SHOULD see table with Russian translations
`, () => {
    mountComponent({
      tcLanguage: 'ru',
    })

    getPaginationPageCount()
      .contains('Показать строк')

    getTablePaginationShowRecords()
      .contains('Показаны')
      .contains('из')

    getPaginationOfTotal()
      .contains('из')
  })

  it(`
  GIVEN desktop client table
  WHEN tcLanguage property is 'ru'
  AND table data is empty
  SHOULD see table with Russian translations
`, () => {
    mountComponent({
      data: [],
      tcLanguage: 'ru',
    })

    getTablePaginationShowRecords()
      .contains('Нет записей')
  })

  it(`
  GIVEN desktop client table
  WHEN tcLanguage property is 'ru'
  AND table data has one record
  SHOULD see table with Russian translations
`, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 1,
      }),
      tcLanguage: 'ru',
    })

    getTablePaginationShowRecords()
      .contains('Единственная запись')
  })
}

function stylingTests() {
  it(`
  GIVEN desktop client table
  WHEN 'isStriped' props is true
  SHOULD see the table in which colors alternate
`, () => {
    mountComponent({
      tcIsStriped: true,
    })

    cy.getByData('table-row-striped')
      .should('exist')
  })

  it(`
  GIVEN desktop table
  WHEN 'id' cell is aligned right
  SHOULD see appropriate style on this cell
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          tcAlign: 'right',
        },
      }),
    })

    getTableCell()
      .first()
      .should('have.css', 'justify-content', 'flex-end')
  })
}

function sortingTests() {
  it(`
  GIVEN desktop client table
  WHEN sorting by id in asc order is enabled
  SHOULD see sorted table contents in asc order by id
`, () => {
    mountComponent({
      tcOrder: {
        id: 'id',
        desc: false,
      },
    })

    getTableRow()
      .first()
      .contains('1')
  })

  it(`
  GIVEN desktop client table
  WHEN sorting by id in desc order is enabled
  SHOULD see sorted table contents in desc order by id
`, () => {
    mountComponent({
      tcOrder: {
        id: 'id',
        desc: true,
      },
    })

    getTableRow()
      .first()
      .contains('2')
  })

  it(`
  GIVEN desktop client table 
  WHEN sorting by id in asc order is enabled 
  AND click on header table with the id value
  AND click on header table with the name value
  SHOULD see sorted table ontents in asc order by name
`, () => {
    mountComponent({
      tcOrder: {
        id: 'id',
        desc: false,
      },
    })

    getTableRow()
      .first()
      .contains('1')

    cy.contains('Id')
      .click()

    getTableRow()
      .first()
      .contains('2')

    cy.contains('Name')
      .click()

    getTableRow()
      .first()
      .contains('Test 1')
  })
}

function filterTests() {
  it(`
  GIVEN desktop table 
  WHEN default input filter is enabled
  AND custom placeholder is set
  SHOULD see input filter with custom placeholder
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          enableColumnFilter: true,
          tcInputFilterProps: {
            placeholder: 'Search',
          },
        },
      }),
    })

    getFilterInputById()
      .should('have.attr', 'placeholder', 'Search')
  })

  it(`
  GIVEN rendered desktop table
  WHEN default input filter is enabled
  AND write the value '2' in the filter input field
  SHOULD see table filtered by value '2'
`, () => {
    mountComponent({
      columns: getColumnsWithProps({
        idColumnProps: {
          enableColumnFilter: true,
        },
      }),
    })

    getTableCell()
      .contains('1')

    getFilterInputById()
      .type('2')

    getTableCell()
      .contains('1')
      .should('not.exist')

    getTableCell()
      .contains('2')
  })

  it(`
  GIVEN desktop table 
  WHEN select filter is enabled
  AND choosing an option 
  SHOULD see filtered results in the table
`, () => {
    mountComponent({
      columns: [
        ...getColumnsWithProps(),
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
        },
      ],
    })

    cy.getByData('table-select-type')
      .select('0')

    getTableCell()
      .contains('Second Type')
      .should('not.exist')

    getTableCell()
      .contains('First Type')
  })

  it(`
  GIVEN desktop table 
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

  it(`
  GIVEN desktop table 
  WHEN select filter is enabled
  AND name column has filterFn fuzzy
  AND write value 'tst 1' in input filter 
  SHOULD see filtered results in the table
`, () => {
    mountComponent({
      columns: [
        ...getColumnsWithProps({
          nameColumnProps: {
            enableColumnFilter: true,
            filterFn: 'fuzzy',
          },
        }),
      ],
    })

    getFilterInputByName()
      .type('tst 1')

    cy.contains('Test 1')
  })
}

function footerTests() {
  it(`
  GIVEN desktop client table 
  WHEN render the component with footer
  SHOULD see it in the table
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

    cy.contains('Footer Id')

    cy.contains('Footer Name')
  })
}

function paginationTests() {
  it(`
  GIVEN desktop table where page size is 10
  WHEN change page size to 20
  SHOULD see 20 records on the page
`, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 20,
      }),
    })

    getTableRow()
      .should('have.length', 10)

    getSelectPagination()
      .select('20')

    getTableRow()
      .should('have.length', 20)
  })

  it(`
  GIVEN desktop table
  WHEN number of records is 30 and page size is 10
  AND click on next page button after click on previous button
  AND click on last button after click on first button
  SHOULD see first page with its data
`, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 30,
      }),
    })

    initializePaginationState()

    goToNextPage()

    goToPrevPage()

    goToLastPage()

    goToFirstPage()

    function initializePaginationState() {
      getPaginationOfTotal()
        .contains('3')

      cy.getByData('table-pagination-page-current')
        .contains(1)

      getTablePaginationShowRecords()
        .contains('Shown 1 - 10 of 30')

      cy.contains('Test 1')
    }

    function goToNextPage() {
      clickOnPaginationButton({
        buttonDataCy: 'next-page-button',
        paginationShowRecordsString: 'Shown 11 - 20 of 30',
        pageCurrent: 2,
        nameData: 'Test 20',
      })
    }

    function goToPrevPage() {
      clickOnPaginationButton({
        buttonDataCy: 'prev-page-button',
        paginationShowRecordsString: 'Shown 1 - 10 of 30',
        pageCurrent: 1,
        nameData: 'Test 1',
      })
    }

    function goToLastPage() {
      clickOnPaginationButton({
        buttonDataCy: 'last-page-button',
        paginationShowRecordsString: 'Shown 21 - 30 of 30',
        pageCurrent: 3,
        nameData: 'Test 30',
      })
    }

    function goToFirstPage() {
      clickOnPaginationButton({
        buttonDataCy: 'first-page-button',
        paginationShowRecordsString: 'Shown 1 - 10 of 30',
        pageCurrent: 1,
        nameData: 'Test 1',
      })
    }

    function clickOnPaginationButton({
      buttonDataCy,
      paginationShowRecordsString,
      pageCurrent,
      nameData,
    }: {
      buttonDataCy: string,
      paginationShowRecordsString: string,
      pageCurrent: number,
      nameData: string,
    }) {
      cy.getByData(buttonDataCy)
        .click()

      getTablePaginationShowRecords()
        .contains(paginationShowRecordsString)

      cy.getByData('table-pagination-page-current')
        .contains(pageCurrent)

      cy.contains(nameData)
    }
  })
}

function actionsTests() {
  it(`
  GIVEN desktop table
  WHEN click on the action button of first record
  SHOULD see opened dropdown with actions
`, () => {
    mountComponent({
      tcActions: [
        {
          name: 'first-button',
          show: () => true,
          renderText: () => 'Open',
          renderIcon: () => <span>👍</span>,
          onClick: () => { },
        },
      ],
      data: generateTableTestData({
        recordCount: 1,
      }),
    })

    cy.get('.tc-table-desktop__action-cell')
      .should('exist')

    cy.getByData('table-dropdown-button')
      .click()

    cy.getByData('table-dropdown-list')
      .contains('Open')

    cy.getByData('table-dropdown-action')
      .should('exist')

    cy.getByData('action-icon')
      .should('exist')
  })
}

function onFiltersChangeTests() {
  it(`
  GIVEN desktop client table with onFiltersChange prop enabled by default
  WHEN render the component
  SHOULD trigger onFiltersChange callback
`, () => {
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

    getFilterInputByName()
      .type('1')

    cy.get('@onFiltersChange')
      .should('have.been.called')
  })
}

function localStorageTests() {
  it(`
  GIVEN desktop client table
  WHEN change pageSize to 20
  SHOULD localStorage named 'desktop-test-table-page-size' is equal 20
  `, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 20,
      }),
    })

    cy.getByData('table-select-pagination')
      .select('20')

    cy.getLocalStorage('desktop-test-table-page-size')
      .then((storage) => {
        expect(storage).to.equal('20')
      })
  })

  it(`
  GIVEN desktop client table
  WHEN localStorage named 'desktop-test-table-page-size' is equal 20
  SHOULD see table with page size equal to 20
  `, () => {
    mountComponent({
      data: generateTableTestData({
        recordCount: 20,
      }),
    })
    localStorage.setItem('desktop-test-table-page-size', '20')

    getSelectPagination()
      .should('have.value', 20)

    getTableRow()
      .should('have.length', 20)
  })
}

function mountComponent({
  data = generateTableTestData({
    recordCount: 2,
  }),
  columns = getColumnsWithProps(),
  tcLoading,
  tcIsStriped,
  tcOrder,
  tcPageSizeOptions,
  tcActions,
  tcLanguage = 'en',
}: Partial<ClientTableProps<TestData>> = {}) {
  cy.viewport(900, 900)

  const onFiltersChangeSpy = cy.spy()
    .as('onFiltersChange')

  cy.mount(
    <ClientTable
      tableId="desktop-test-table"
      data={data}
      columns={columns}
      tcLoading={tcLoading}
      tcIsStriped={tcIsStriped}
      tcOrder={tcOrder}
      tcRenderMobileTitle={(row) => row.original.name}
      tcPageSizeOptions={tcPageSizeOptions}
      tcActions={tcActions}
      tcOnFiltersChange={onFiltersChangeSpy}
      tcLanguage={tcLanguage}
    />,
  )
}

function getTableCell() {
  return cy.getByData('table-cell')
}

function getTablePaginationShowRecords() {
  return cy.getByData('table-pagination-shown-records')
}

function getPaginationOfTotal() {
  return cy.getByData('table-desktop-pagination-of-total')
}

function getPaginationPageCount() {
  return cy.getByData('table-pagination-page-count')
}
