import { i18n } from '../../i18n/i18n'
import { Loader } from './Loader'

describe('loader', () => {
  describe('loading', loadingTests)

  describe('translation', translationTests)
})

function loadingTests() {
  test(`
  GIVEN loader component
  WHEN 'loading' props is true
  SHOULD see the loader
`, () => {
    mountComponent()

    getLoader()
      .should('exist')
  })

  test(`
  GIVEN loader component
  WHEN 'loading' props is false
  SHOULD not see the loader
`, () => {
    mountComponent({
      loading: false,
    })

    getLoader()
      .should('not.exist')
  })
}

function translationTests() {
  test(`
  GIVEN loader component
  WHEN language property is 'en'
  SHOULD see loader with English translations
`, () => {
    mountComponent()

    getLoader()
      .contains('Loading...')
  })

  test(`
  GIVEN loader component
  WHEN language property is 'ru'
  SHOULD see loader with Russian translations
`, () => {
    mountComponent({
      language: 'ru',
    })

    getLoader()
      .contains('Загрузка...')
  })
}

function mountComponent({
  loading = true,
  language = 'en',
}: {
  loading?: boolean,
  language?: string,
} = {}) {
  cy.mount(
    <Loader
      loading={loading}
      languageStrings={i18n(language)}
    />,
  )
}

function getLoader() {
  return cy.getByData('loader')
}
