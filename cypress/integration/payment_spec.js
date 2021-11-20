// const { cy } = require("date-fns/locale");
const {v4: uuidv4} = require('uuid');

describe('payment', () => {
    it('user can make payment', () => {
        //login
        cy.visit('/');
        cy.findByRole('textbox', { name: /username/i }).type('johndoe');
        cy.findByLabelText(/password/i).type('s3cret');
        cy.findByRole('checkbox', { name: /remember me/i }).check();
        cy.findByRole('button', { name: /sign in/i }).click();

        //check account balance
        let old_balance;
        cy.get('[data-test=sidenav-user-balance]').then($balance => old_balance = $balance.text());

        // click on pay button
        cy.findByRole('button', { name: /new/i }).click();

        // search for user
        cy.findByRole('textbox').type('devon becker');
        cy.findByText(/devon becker/i).click();

        // add amount and note and click pay
        const payment_amount = "5.0";
        cy.findByPlaceholderText(/amount/i).type(payment_amount);
        const note = uuidv4();
        cy.findByPlaceholderText(/add a note/i).type(note);
        cy.findByRole('button', { name: /sign in/i }).click();

        // return to transactions
        cy.findByRole('button', { name: /return to transactions/i }).click();

        // go to personal payments
        cy.findByRole('tab', { name: /mine/i }).click();

        // click on payment
        cy.findByText(note).click({ force: true });

        // verify if payment was made
        cy.findByText(`-${payment_amount}`).should('be.visible')
        cy.findByText(`note`).should('be.visible')

        // verify if payment amount was deducted
        cy.get('[data-test=sidenav-user-balance]').then($balance => {
            const converted_old_balance = parseFloat(old_balance.replace(/\$|,/g, ""));
            const converted_new_balance = parseFloat($balance.text().replace(/\$|,/g, ""));
            expect(converted_old_balance - converted_new_balance).to.equal(parseFloat(payment_amount));
        });

    })
})