import { ReactNode } from 'react'
import { i18n } from '../../../../../../../i18n/i18n'
import { MobileSortingPopup } from './MobileSortingPopup'

describe('mobileSortingPopup', () => {
  describe('initialization', () => {
    describe('initializeComponent', initializeComponentTests)

    describe('initializeTranslation', initializeTranslationTests)
  })

  describe('interaction', interactionTests)
})

function initializeComponentTests() {
  it(`
  GIVEN MobileSortingPopup component
  WHEN render this component
  SHOULD see sorting options
`, () => {
    mountComponent()

    cy.getByData('table-mobile-sorting-popup')
      .should('exist')

    cy.contains('Id')

    cy.contains('Name')
  })
}

function interactionTests() {
  it(`
  GIVEN MobileSortingPopup component
  WHEN click on cancel button
  SHOULD trigger on click event
`, () => {
    mountComponent()

    cy.contains('Cancel')
      .click()

    cy.get('@onClick')
      .should('have.been.calledOnce')
  })

  it(`
  GIVEN MobileSortingPopup component
  WHEN toggle sorting type 
  SHOULD trigger on change event
`, () => {
    mountComponent()

    cy.contains('Apply')
      .click()

    cy.get('@onChange')
      .should('have.been.calledOnce')
  })
}

function initializeTranslationTests() {
  it(`
  GIVEN MobileSortingPopup component
  WHEN tcLanguage property is 'en'
  SHOULD see component with English translations
`, () => {
    mountComponent()

    cy.contains('Sorting')

    cy.contains('Ascending')

    cy.contains('Descending')
  })

  it(`
  GIVEN MobileSortingPopup component
  WHEN tcLanguage property is 'ru'
  SHOULD see component with Russian translations
`, () => {
    mountComponent({
      tcLanguage: 'ru',
    })

    cy.contains('Сортировка')

    cy.contains('По возрастанию')

    cy.contains('По убыванию')
  })
}

function mountComponent({
  tcLanguage = 'en',
  sortByColumn = {
    desc: false,
    id: 'name',
  },
  columnOptions = [
    {
      value: 'id',
      label: 'Id',
    },
    {
      value: 'name',
      label: 'Name',
    },
  ],
}: {
  tcLanguage?: string,
  columnOptions?: {
    label: ReactNode,
    value: string,
  }[],
  sortByColumn?: {
    desc: boolean,
    id: string,
  },
} = {}) {
  const onClickSpy = cy.spy()
    .as('onClick')

  const onChange = cy.spy()
    .as('onChange')

  cy.mount(
    <MobileSortingPopup
      onClose={onClickSpy}
      languageStrings={i18n(tcLanguage)}
      sortByColumn={sortByColumn}
      columnOptions={columnOptions}
      setSorting={onChange}
    />,
  )
}
