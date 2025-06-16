import { i18n } from '../../../../../i18n/i18n'
import { MobilePagination } from './MobilePagination'

describe('mobilePagination', () => {
  describe('initialization', initializeTests)

  describe('translations', translationsTests)

  describe('showMore', showMoreTests)
})

function initializeTests() {
  it(`
  GIVEN MobilePagination component
  WHEN totalCount is 10
  AND pageSize is 5
  SHOULD see rendered component
`, () => {
    mountComponent()

    cy.getByData('table-mobile-pagination')
      .should('exist')

    cy.getByData('table-mobile-counter')
      .contains(5)

    cy.getByData('table-mobile-total-count')
      .contains(10)

    cy.getByData('table-mobile-show-more')
      .should('exist')
  })
}

function translationsTests() {
  it(`
  GIVEN MobilePagination component
  WHEN language property is 'en'
  SHOULD see component with English translations
`, () => {
    mountComponent()

    cy.contains('Shown')

    cy.contains('of')

    cy.contains('Show More')
  })

  it(`
  GIVEN MobilePagination component
  WHEN language property is 'ru'
  SHOULD see component with Russian translations
`, () => {
    mountComponent({
      language: 'ru',
    })

    cy.contains('Показаны')

    cy.contains('из')

    cy.contains('Показать еще')
  })
}

function showMoreTests() {
  it(`
  GIVEN MobilePagination component
  WHEN totalCount is 5
  AND pageSize is 5
  SHOULD not see show more button
`, () => {
    mountComponent({
      totalCount: 5,
    })

    cy.getByData('table-mobile-show-more')
      .should('not.exist')
  })

  it(`
  GIVEN MobilePagination component
  WHEN totalCount is 10
  AND pageSize is 5
  AND click show more button 
  SHOULD trigger on click event 
`, () => {
    mountComponent()

    cy.getByData('table-mobile-show-more')
      .click()

    cy.get('@onClick')
      .should('have.been.calledOnce')
  })
}

function mountComponent({
  totalCount = 10,
  pageSize = 5,
  language = 'en',
}: {
  totalCount?: number,
  pageSize?: number,
  language?: string,
} = {}) {
  const onClickSpy = cy.spy()
    .as('onClick')

  cy.mount(
    <MobilePagination
      totalCount={totalCount}
      pageSize={pageSize}
      setPageSize={onClickSpy}
      languageStrings={i18n(language)}
    />,
  )
}
