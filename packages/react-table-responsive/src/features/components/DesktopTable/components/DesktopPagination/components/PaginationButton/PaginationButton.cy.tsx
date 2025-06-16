import { ReactNode } from 'react'
import { PaginationButton } from './PaginationButton'

describe('paginationButton', () => {
  describe('initialize', () => {
    describe('initializeTitle', initializeTitleTests)

    describe('initializeChildren', initializeChildrenTests)
  })

  describe('click', clickTests)

  describe('disabled', disabledTests)
})

function initializeTitleTests() {
  it(`
  GIVEN PaginationButton component
  WHEN title props is "Test title"
  SHOULD have "Test title" attribute on button
`, () => {
    mountComponent({
      title: 'Test title',
    })

    // ToDo hover doesn't work
    getButton()
      .should('have.attr', 'title', 'Test title')
  })
}

function initializeChildrenTests() {
  it(`
  GIVEN PaginationButton component
  WHEN children props is "Hello"
  SHOULD see "Hello" text on the button 
`, () => {
    mountComponent({
      children: 'Hello',
    })

    getButton()
      .contains('Hello')
  })
}

function disabledTests() {
  it(`
  GIVEN PaginationButton component
  WHEN disabled props is true
  SHOULD see disabled button
`, () => {
    mountComponent({
      disabled: true,
    })

    getButton()
      .should('be.disabled')
  })

  it(`
  GIVEN PaginationButton component
  WHEN disabled props is false
  SHOULD see not disabled button
`, () => {
    mountComponent()

    getButton()
      .should('not.be.disabled')
  })
}

function clickTests() {
  it(`
  GIVEN PaginationButton component
  WHEN click on button
  SHOULD trigger on click event
`, () => {
    mountComponent()

    getButton()
      .click()

    cy.get('@onClick')
      .should('have.been.calledOnce')
  })
}

function mountComponent({
  children = 'Button',
  title = 'Test',
  disabled = false,
}: {
  children?: ReactNode,
  title?: string,
  disabled?: boolean,
} = {}) {
  const onClickSpy = cy.spy()
    .as('onClick')

  cy.mount(
    <PaginationButton
      title={title}
      disabled={disabled}
      onClick={onClickSpy}
      dataCy="pagination-button"
    >
      {children}
    </PaginationButton>,
  )
}

function getButton() {
  return cy.getByData('pagination-button')
}
