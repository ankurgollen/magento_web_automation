// MyAccountPage.js
import '../support/commands';

class MyAccountPage {
    // Define elements and methods for the My Account page

    get thankYouMessage() {
        cy.log('Checking thank you message after registration');
        return cy.get('div.page.messages').contains('Thank you for registering with Main Website Store.');
    }

    get contactInfo() {
        cy.log('Retrieving contact information block');
        return cy.get('div.box.box-information').children('div.box-content');
    }

    get pageTitle() {
        cy.log('Checking My Account page title');
        return cy.get('h1.page-title span').contains('My Account');
    }

    verifyAccountCreationSuccess(user) {
        cy.log('Verifying account creation success');
        cy.logStep('Confirmed account creation with user details');
        this.pageTitle.should('be.visible');
        this.thankYouMessage.should('be.visible');
        this.contactInfo.should('contain.text', user.firstName)
            .and('contain.text', user.lastName)
            .and('contain.text', user.email);
    }

    verifyAccountDetails(user) {
        cy.log('Verifying account details');
        cy.logStep('Checked account details for user');
        this.contactInfo.should('contain.text', user.firstName)
            .and('contain.text', user.lastName)
            .and('contain.text', user.email);
    }
    navigateToAccount() {
        cy.log('Navigating to My Account page');
        cy.visit('/customer/account');
        cy.logStep('Navigated to My Account page');
    }
}

export default new MyAccountPage();