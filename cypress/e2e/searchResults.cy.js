/// <reference types="cypress" />

import TopNavBar from '../pages/topNavBar';
import SearchResultsPage from '../pages/SearchResultsPage';

describe('Search Results Page Tests', () => {

    const validSearchTerm = 'jacket';
    const invalidSearchTerm = 'nonexistingproduct';

    it('should display results for a valid search term', () => {
        cy.visit('/');
        TopNavBar.searchFor(validSearchTerm);

        SearchResultsPage.verifyResultsVisible();
        SearchResultsPage.validateProductNamesContain(validSearchTerm);
        SearchResultsPage.getTotalCountText();
    });

    it('should display a message for no search results', () => {
        cy.visit('/');
        TopNavBar.searchFor(invalidSearchTerm);
        SearchResultsPage.verifyNoResultsFound();
    });

    //   it('should allow sorting of search results', () => {
    //     cy.visit('/');
    //     TopNavBar.searchFor(validSearchTerm);

    //     // Sort by price: low to high
    //     SearchResultsPage.selectSortBy('Price');
    //     SearchResultsPage.getSortDirectionButton().click(); // Click to toggle sort direction

    //     // Add an assertion here based on visual sorting (optional)
    //     SearchResultsPage.verifyResultsVisible();
    //     SearchResultsPage.verifyPricesSortedAccordingToDirection();
    //   });

});
