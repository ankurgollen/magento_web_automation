// ShippingAddressPage.js
import '../support/commands';

class ShippingAddressPage {

    get firstNameInput() { return cy.get('input[name="firstname"]'); }
    get lastNameInput() { return cy.get('input[name="lastname"]'); }
    get streetAddressInput() { return cy.get('input[name="street[0]"]'); }
    get cityInput() { return cy.get('input[name="city"]'); }
    get regionDropdown() { return cy.get('select[name="region_id"]'); }
    get zipInput() { return cy.get('input[name="postcode"]'); }
    get countryDropdown() { return cy.get('select[name="country_id"]'); }
    get phoneInput() { return cy.get('input[name="telephone"]'); }
    get shipHereButton() { return cy.get('button.action.continue.primary'); }
    get addressForm() { return cy.get('form[name="co-shipping-form"]'); }
    get existingAddressBlock() { return cy.get('.shipping-address-item.selected-item'); }
    get tableRateRadio() { return cy.get('input[type="radio"][value="tablerate_bestway"]', { timeout: 10000 }).should('be.visible'); }
    get fixedRateRadio() { return cy.get('input[type="radio"][value="flatrate_flatrate"]'); }
    get nextButton() { return cy.get('button.continue'); }
    get loader() { return cy.get('.loader > img'); }

    fillAddress({ firstName, lastName, street, city, region, zip, country, phone }) {
        cy.log('Filling out the shipping address form');
        cy.logStep('Entered all shipping address fields');
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.streetAddressInput.clear().type(street);
        this.cityInput.clear().type(city);
        this.regionDropdown.select(region);
        this.zipInput.clear().type(zip);
        this.countryDropdown.select(country);
        this.phoneInput.clear().type(phone);
    }

    clickShipHere() {
        cy.log('Clicking Ship Here button');
        cy.logStep('Clicked Ship Here to submit shipping address');
        this.shipHereButton.click();
    }

    verifyAddressPresent() {
        cy.log('Verifying if address is already present');
        cy.logStep('Checked for presence of existing shipping address');
        return this.existingAddressBlock.should('be.visible', { timeout: 10000 });
    }

    addAddressIfNotPresent(address) {
        cy.log('Checking if address needs to be added');
        cy.logStep('Attempting to add address if not already present');
        this.existingAddressBlock.then($el => {
            if ($el.length === 0) {
                this.fillAddress(address);
                this.clickShipHere();
            }
        });
    }

    selectTableRate() {
        cy.log('Selecting Table Rate shipping option');
        cy.logStep('Selected Table Rate as shipping method');
        this.tableRateRadio.check({ force: true });
    }

    selectFixedRate() {
        cy.log('Selecting Fixed Rate shipping option');
        cy.logStep('Selected Fixed Rate as shipping method');
        this.fixedRateRadio.check({ force: true });
    }

    clickNext() {
        cy.log('Clicking Next to proceed to payment');
        cy.logStep('Proceeded to Review & Payment section');
        this.nextButton.should('be.visible').click();
    }

    get activeStep() {
        return cy.get('ul.opc-progress-bar').find('li.opc-progress-bar-item._active');
    }

    confirmShippingAddressStepSelected() {
        cy.log('Confirming Shipping Address step is active');
        cy.logStep('Verified that Shipping Address step is active');
        this.activeStep.should('contain.text', 'Shipping Address');
    }
}

export default new ShippingAddressPage();
