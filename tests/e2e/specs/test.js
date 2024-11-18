// https://docs.cypress.io/api/table-of-contents

// Test will run through all 6 test cases via Cypress automated browser control with input and mouse clicks.

// Run emulator with imported data before test w/ following command
// Firebase emulators:start --import=exported-dev-data --export-on-exit=exported-dev-data
// Ensure auth and firestore emulators in Main.js are match your local port configurations
// Verify application server should run on 8081, if not modify below


describe('My First Test', () => {


  it('Visits the app root url', () => {

    // Navigate to page, verify load
    cy.visit('http://localhost:8081')//localhost sever port
    cy.contains('Login')

    // Use Case 1 Log In w/ invalid and valid credentials
    cy.get('input[name="email"]').type("admin@admin.com").should('have.value','admin@admin.com')
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait(8000)
    cy.contains('Scheduler App!').should("be.visible")
    cy.wait(8000)
    // Use Case 2 View events on calendar
    cy.get('.v-event-summary').should('be.visible')

    // Use Case 3 Add new event
    cy.get('.row > .v-btn > .v-btn__content').click() // New Task Button

    cy.get('#input-93').click()// Event Type Dropdown
    cy.wait(4000)
    cy.get('#list-item-138-0 > .v-list-item__content > .v-list-item__title').click()


    cy.get('#input-98').click() // Tech drop down
    cy.wait(4000)
    cy.get('#list-item-147-0 > .v-list-item__content > .v-list-item__title').click()

    cy.get('#input-103').type("1234 Mountain Drive") // Address field
    cy.get('#input-106').type("Lorem ipsum odor amet, consectetuer adipiscing elit.") // Description field

    cy.get('#input-110').click() // Start Time Date Picker
    cy.wait(2000)
    cy.get('tbody > :nth-child(2) > :nth-child(5) > .v-btn > .v-btn__content').click()

    cy.get('#input-115').click() // End Time Date Picker
    cy.wait(2000)
    cy.get('.menuable__content__active > .v-picker > .v-picker__body > :nth-child(1) > .v-date-picker-table > table > tbody > :nth-child(2) > :nth-child(5) > .v-btn > .v-btn__content').click()


    cy.get('.v-input--selection-controls__ripple').click() // click All Day? check box
    cy.get('form > :nth-child(7) > .v-btn__content').click() // Submit
    cy.wait(10000)


    // Use Case 4 View event details and Update/complete an event
    cy.get(':nth-child(5) > .v-event > .pl-1 > .v-event-summary').click() // View created event
    cy.wait(4000)
    cy.get('#input-204').type("Plan 15/10") // Tech Notes input field
    cy.get(':nth-child(2) > .v-btn__content').click() // Complete
    cy.wait(4000)

    cy.get(':nth-child(5) > .v-event > .pl-1 > .v-event-summary').click() // Updated event
    cy.wait(4000)
    cy.get('.green--text').should('be.visible')
    cy.get('#submittedTechNotes').should("contain.text", "Plan 15/10")

    // Use Case 5 Delete event
    cy.get('.v-card__actions > :nth-child(3) > .v-btn__content').click()
    cy.wait(4000)
    cy.get(':nth-child(5) > .v-event > .pl-1 > .v-event-summary').should('not.exist')


    // Use case 6 Log Out
   cy.get('button[name="Logout"]').click()
  })
})