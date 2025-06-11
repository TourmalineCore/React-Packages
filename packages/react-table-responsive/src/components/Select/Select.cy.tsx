import { Select } from './Select'

describe('select', () => {
  describe('initialize', initializeTests)

  describe('onChange', onChangeTests)
})

function initializeTests() {
  test(`
  GIVEN select component
  WHEN select value 10
  SHOULD see it
`, () => {
    mountComponent()

    getSelect()
      .should('have.value', 10)
  })
}

function onChangeTests() {
  test(`
  GIVEN select component
  WHEN select value 10
  AND change selected value to 20
  SHOULD onChange will be called once
`, () => {
    mountComponent()

    getSelect()
      .select('20')

    cy.get('@onChange')
      .should('have.been.calledOnce')
  })
}

const DEFAULT_SELECT_OPTIONS = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
]

function mountComponent({
  value = 10,
  options = [
    ...DEFAULT_SELECT_OPTIONS,
  ],
}: {
  options?: {
    value: string | number,
    label: string,
  }[],
  value?: string | number,
} = {}) {
  const onChangeSpy = cy.spy()
    .as('onChange')

  cy.mount(
    <Select
      value={value}
      options={options}
      onChange={onChangeSpy}
      dataCy="test-select"
    />,
  )
}

function getSelect() {
  return cy.getByData('test-select')
}
