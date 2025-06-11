// CustomerLoginPage.js
import '../support/commands';

class CustomerLoginPage {
    get email() { return cy.get('[id="email"]'); }
    get password() { return cy.get('input#pass[name="login[password]"]'); }
    get loginBtn() { return cy.get('button#send2').contains('Sign In'); }

    visitLoginPage() {
        cy.log('Navigating to Customer Login page');
        cy.visit('/customer/account/login');
        cy.logStep('Customer Login page is displayed');
    }

    fillForm({ email, password }) {
        cy.log('Filling in login form');
        cy.logStep('Entered email and password into login form');
        this.email.type(email);
        this.password.type(password);
    }

    submitForm() {
        cy.log('Submitting login form');
        cy.logStep('Clicked on Sign In button');
        this.loginBtn.click();
    }
}

export default new CustomerLoginPage();
