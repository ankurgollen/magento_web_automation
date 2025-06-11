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

    verifyPricesSortedAccordingToDirection() {
        cy.log('Verifying price sort order based on direction');
        cy.logStep('Checked sort direction and validated price order accordingly');
        this.getSortDirectionButton()
            .invoke('attr', 'data-value')
            .then((direction) => {
                cy.log(`Detected sort direction: ${direction}`);
                if (direction === 'asc') {
                    this.assertPricesAscending();
                } else if (direction === 'desc') {
                    this.assertPricesDescending();
                } else {
                    throw new Error(`Unexpected sort direction: ${direction}`);
                }
            });
    }

    assertPricesAscending() {
        cy.log('Asserting prices are in ascending order');
        cy.logStep('Validated product prices are sorted low to high');
        cy.get('.price')
            .then(($prices) => {
                const priceValues = [...$prices].map(el =>
                    parseFloat(el.innerText.replace(/[^0-9.]/g, ''))
                );
                const sorted = [...priceValues].sort((a, b) => a - b);
                expect(priceValues).to.deep.equal(sorted);
            });
    }

    assertPricesDescending() {
        cy.log('Asserting prices are in descending order');
        cy.logStep('Validated product prices are sorted high to low');
        cy.get('.price')
            .then(($prices) => {
                const priceValues = [...$prices].map(el =>
                    parseFloat(el.innerText.replace(/[^0-9.]/g, ''))
                );
                const sorted = [...priceValues].sort((a, b) => b - a);
                expect(priceValues).to.deep.equal(sorted);
            });
    }

    clickProductByName(productName) {
        cy.log(`Clicking product link for: ${productName}`);
        cy.logStep(`Clicked on product link for ${productName}`);
        this.getProductLink(productName).click();
    }
}

export default new SearchResultsPage();
