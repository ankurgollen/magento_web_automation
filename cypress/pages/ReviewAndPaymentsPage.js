// ReviewAndPaymentsPage.js
import '../support/commands';

class ReviewAndPaymentsPage {

    get pageTitle() {
        return cy.get('h1.page-title span');
    }

    get orderItems() {
        return cy.get('.items-in-cart .product-item-name');
    }

    get itemPrices() {
        return cy.get('.minicart-items .product-item .cart-price .price');
    }

    get totalAmount() {
        return cy.get('.grand.totals .price');
    }

    get placeOrderButton() {
    return cy.get('button[title="Place Order"]', { timeout: 20000});
    }

    get activeStep() {
        return cy.get('ul.opc-progress-bar').find('li.opc-progress-bar-item._active');
    }

    confirmReviewAndPaymentStepSelected() {
        cy.log('Confirming Review & Payments step is active');
        cy.logStep('Verified Review & Payments step is selected');
        this.activeStep.should('contain.text', 'Review & Payments', { timeout: 10000 });
    }

    confirmPageTitle(expectedTitle) {
        cy.log(`Confirming page title is: ${expectedTitle}`);
        cy.logStep(`Verified Review & Payments page title is: ${expectedTitle}`);
        this.pageTitle.should('be.visible').and('have.text', expectedTitle);
    }

    confirmOrderItems(expectedItemsArray) {
        cy.log('Confirming order summary contains expected items');
        cy.logStep('Verified all items are listed in the order summary');
        this.orderItems.should('have.length', expectedItemsArray.length);
        this.orderItems.each((item, index) => {
            cy.wrap(item).should('contain.text', expectedItemsArray[index]);
        });
    }

    verifyTotalAmountMatchesSum() {
        cy.log('Verifying total amount equals sum of all item prices');
        cy.logStep('Calculated sum of item prices and matched with displayed total');
        let itemPricesTotal = 0;

        this.itemPrices.each(($el) => {
            const priceText = $el.text().replace(/[^0-9.]/g, '');
            itemPricesTotal += parseFloat(priceText);
        }).then(() => {
            this.totalAmount.invoke('text').then((totalText) => {
                const totalValue = parseFloat(totalText.replace(/[^0-9.]/g, ''));
                expect(totalValue).to.eq(itemPricesTotal);
            });
        });
    }

    clickPlaceOrder() {
        cy.log('Clicking on Place Order button');
        cy.logStep('Clicked the Place Order button to complete checkout');
        this.placeOrderButton.should('be.visible').and('not.be.disabled').click();
    }
}

export default new ReviewAndPaymentsPage();
