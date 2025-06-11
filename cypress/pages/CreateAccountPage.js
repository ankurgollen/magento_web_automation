// CreateAccountPage.js
import '../support/commands';

class CreateAccountPage {
    get firstName() {
        cy.log('Getting first name input');
        return cy.get('[id="firstname"]');
    }

    get lastName() {
        cy.log('Getting last name input');
        return cy.get('[id="lastname"]');
    }

    get email() {
        cy.log('Getting email input');
        return cy.get('[id="email_address"]');
    }

    get password() {
        cy.log('Getting password input');
        return cy.get('[id="password"]');
    }

    get confirmPassword() {
        cy.log('Getting confirm password input');
        return cy.get('[id="password-confirmation"]');
    }

    get createBtn() {
        cy.log('Getting create account button');
        return cy.get('button:contains("Create an Account")');
    }

    fillForm({ firstName, lastName, email, password }) {
        cy.log('Filling out the account creation form');
        cy.logStep('Filled in first name, last name, email, and passwords');
        this.firstName.type(firstName);
        this.lastName.type(lastName);
        this.email.type(email);
        this.password.type(password);
        this.confirmPassword.type(password);
    }

    submit() {
        cy.log('Submitting the create account form');
        cy.logStep('Clicked Create an Account button');
        this.createBtn.click();
    }
}

export default new CreateAccountPage();
