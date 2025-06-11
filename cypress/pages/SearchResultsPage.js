// SearchResultsPage.js
import '../support/commands';

class SearchResultsPage {
    getProductNames() {
        return cy.get('.product-item-name a');
    }

    getProductLink(productName) {
        return cy.contains('.product-item-link', productName);
    }

    getProductList() {
        return cy.get('.products-grid .product-item');
    }

    getNoResultsMessage() {
        return cy.get('.message.notice');
    }

    validateProductNamesContain(searchTerm) {
        cy.log(`Validating product names contain: ${searchTerm}`);
        cy.logStep(`Validated that product names include search term: ${searchTerm}`);
        this.getProductNames().each(($el) => {
            const name = $el.text().toLowerCase();
            expect(name).to.include(searchTerm.toLowerCase());
        });
    }

    getTotalCountText() {
        return cy.get('.toolbar-amount').should('be.visible');
    }

    getSortDropdown() {
        return cy.get('select#sorter').first();
    }

    selectSortBy(optionText) {
        cy.log(`Selecting sort option: ${optionText}`);
        cy.logStep(`Selected sorting by: ${optionText}`);
        this.getSortDropdown().select(optionText);
        cy.get('select#sorter option:selected').should('contain.text', optionText);
    }

    verifyResultsVisible() {
        cy.log('Verifying that search results are visible');
        cy.logStep('Confirmed product list is visible in search results');
        this.getProductList().should('have.length.greaterThan', 0);
    }

    verifyNoResultsFound() {
        cy.log('Checking for no results found message');
        cy.logStep('Verified no search results were returned');
        this.getNoResultsMessage()
            .should('be.visible')
            .and('contain.text', 'Your search returned no results');
    }

    getSortDirectionButton() {
        cy.log('Clicking sort direction button');
        cy.logStep('Clicked on Sort Direction toggle');
        return cy.get('a[data-role="direction-switcher"]:visible').first().should('be.visible').click();
    }

    clickProductByName(productName) {
        cy.log(`Clicking product link for: ${productName}`);
        cy.logStep(`Clicked on product link for ${productName}`);
        this.getProductLink(productName).click();
    }
}

export default new SearchResultsPage();
