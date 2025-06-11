import { MobileActions } from './MobileActions'

describe('mobileActions', () => {
  describe('initialization', initializeTests)

  describe('interaction', interactionTests)
})

function initializeTests() {
  test(`
  GIVEN MobileActions component
  WHEN render this component
  AND there is one action
  SHOULD see the component with one action
`, () => {
    mountComponent()

    cy.getByData('table-mobile-actions')
      .should('exist')

    cy.getByData('table-mobile-action')
      .contains('Open')

    cy.getByData('table-mobile-action-icon')
      .should('exist')
  })
}

function interactionTests() {
  test(`
  GIVEN MobileActions component
  WHEN click action button
  SHOULD trigger on click event
`, () => {
    mountComponent()

    cy.getByData('table-mobile-action')
      .click()

    cy.get('@onClick')
      .should('have.been.calledOnce')
  })
}

function mountComponent() {
  const onClickSpy = cy.spy()
    .as('onClick')

  cy.mount(
    <MobileActions
      actions={[
        {
          name: 'first-button',
          show: () => true,
          renderText: () => 'Open',
          renderIcon: () => <span>👍</span>,
          onClick: onClickSpy,
        },
      ]}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      row={{
        id: 'test-id',
      }}
    />,
  )
}
