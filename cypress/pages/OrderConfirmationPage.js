// OrderConfirmationPage.js
import '../support/commands';

class OrderConfirmationPage {
    get thankYouText() {
        return cy.contains('Thank you for your purchase!');
    }

    get orderNumber() {
        return cy.get('.order-number > strong');
    }

    verifyThankYouMessage() {
        cy.log('Verifying thank you message is visible');
        cy.logStep('Confirmed that thank you message is displayed');
        this.thankYouText.should('be.visible');
    }

    verifyOrderNumberIsVisible() {
        cy.log('Verifying order number is visible');
        cy.logStep('Confirmed that order number is displayed');
        this.orderNumber.should('be.visible').and('not.be.empty');
    }

    getOrderNumberText() {
        cy.log('Getting order number text');
        cy.logStep('Fetched order number from confirmation page');
        return this.orderNumber.invoke('text');
    }
}

export default new OrderConfirmationPage();
