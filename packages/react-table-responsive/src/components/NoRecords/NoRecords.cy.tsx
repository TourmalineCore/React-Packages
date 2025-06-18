import { i18n } from '../../i18n/i18n'
import { NoRecords } from './NoRecords'

describe('noRecords', () => {
  describe('initialize', initializeTests)
  describe('initializeTranslation', initializeTranslationTests)
})

function initializeTests() {
  it(`
  GIVEN NoRecords component
  WHEN isShow prop is false 
  SHOULD not see no records message
`, () => {
    mountComponent({
      isShow: false,
    })

    cy.contains('No matching records found')
      .should('not.exist')
  })

  it(`
  GIVEN NoRecords component
  WHEN isShow prop is true
  SHOULD see no records message
`, () => {
    mountComponent()

    cy.contains('No matching records found')
  })
}

function initializeTranslationTests() {
  it(`
  GIVEN NoRecords component
  WHEN language property is 'ru'
  SHOULD see component with Russian translations
`, () => {
    mountComponent({
      language: 'ru',
    })

    cy.contains('Не найдено подходящих записей')
  })
}

function mountComponent({
  isShow = true,
  language = 'en',
}: {
  isShow?: boolean,
  language?: string,
} = {}) {
  cy.mount(
    <NoRecords
      isShow={isShow}
      languageStrings={i18n(language)}
    />,
  )
}
