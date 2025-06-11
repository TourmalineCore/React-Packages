import { TablesState } from './tables-state'

const DEFAULT_SORT_BY = [
  {
    desc: true,
    id: 'Name',
  },
]

const DEFAULT_FILTERS = [
  {
    id: 'Name',
    value: 'Test 1',
  },
]

describe('tablesState', () => {
  let tablesState: TablesState

  beforeEach(() => {
    tablesState = new TablesState()
  })

  it(`
  GIVEN tables state
  WHEN initialize
  SHOULD return initial empty state
`, () => {
    expect(tablesState.getTableState({
      tableId: 'table-1',
    })).to.eq(undefined)
  })

  it(`
  GIVEN tables state
  WHEN set sorting options
  AND use saveSortBy method
  SHOULD return state with these options
`, () => {
    tablesState.saveSortBy({
      tableId: 'table-1',
      sortBy: DEFAULT_SORT_BY,
    })

    expect(tablesState.getTableState({
      tableId: 'table-1',
    })).to.deep.equal({
      sortBy: DEFAULT_SORT_BY,
    })
  })

  it(`
  GIVEN tables state
  WHEN set filtering conditions
  AND use saveFilters method
  SHOULD return state matching these conditions
`, () => {
    tablesState.saveFilters({
      tableId: 'table-1',
      filters: DEFAULT_FILTERS,
    })

    expect(tablesState.getTableState({
      tableId: 'table-1',
    })).to.deep.equal({
      filters: DEFAULT_FILTERS,
    })
  })

  it(`
  GIVEN tables state
  WHEN no sorting conditions are set
  AND getDefaultSortBy is used
  SHOULD return state with default sorting 
`, () => {
    expect(tablesState.getDefaultSortBy({
      tableId: 'table-1',
      initialState: DEFAULT_SORT_BY,
    })).to.eq(
      DEFAULT_SORT_BY,
    )
  })

  it(`
  GIVEN tables state
  WHEN sorting conditions are set
  AND getDefaultSortBy is used
  SHOULD return state with chosen sorting conditions
`, () => {
    const sortFromState = [
      {
        desc: false,
        id: 'Id',
      },
    ]

    tablesState.saveSortBy({
      tableId: 'table-1',
      sortBy: sortFromState,
    })

    expect(tablesState.getDefaultSortBy({
      tableId: 'table-1',
      initialState: DEFAULT_SORT_BY,
    })).to.deep.equal(
      sortFromState,
    )
  })

  it(`
  GIVEN tables state
  WHEN no filtering conditions are set
  AND getDefaultFilters is used
  SHOULD return state with default filtering conditions
`, () => {
    expect(tablesState.getDefaultFilters({
      tableId: 'table-1',
      initialState: DEFAULT_FILTERS,
    })).to.deep.equal(
      DEFAULT_FILTERS,
    )
  })

  it(`
  GIVEN tables state
  WHEN filtering conditions are set
  AND getDefaultFilters is used
  SHOULD return state with chosen filtering conditions
`, () => {
    const filtersFromState = [
      {
        id: 'Id',
        value: 'Test 2',
      },
    ]

    tablesState.saveFilters({
      tableId: 'table-1',
      filters: filtersFromState,
    })

    expect(tablesState.getDefaultFilters({
      tableId: 'table-1',
      initialState: DEFAULT_FILTERS,
    })).to.deep.equal(
      filtersFromState,
    )
  })
})
