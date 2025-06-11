import { ReactNode } from 'react'
import { MobileHeaderButton } from './MobileHeaderButton'

describe('mobileHeaderButton', () => {
  describe('initialization', initializeComponentTests)

  describe('interaction', interactionTests)
})

function initializeComponentTests() {
  test(`
  GIVEN mobile client table
  WHEN render this component
  AND children is 'Button'
  SHOULD see button with 'Button' text
`, () => {
    mountComponent()

    cy.getByData('table-mobile-sorting-button')
      .should('exist')

    cy.contains('Button')
  })
}

function interactionTests() {
  test(`
  GIVEN mobile client table
  WHEN click on button
  SHOULD trigger on click event
`, () => {
    mountComponent()

    cy.getByData('table-mobile-sorting-button')
      .click()

    cy.get('@onClick')
      .should('have.been.calledOnce')
  })
}

function mountComponent({
  children = 'Button',
}: {
  children?: ReactNode,
} = {}) {
  const onClickSpy = cy.spy()
    .as('onClick')

  cy.mount(
    <MobileHeaderButton
      children={children}
      onClick={onClickSpy}
      dataCy="table-mobile-sorting-button"
    />,
  )
}
