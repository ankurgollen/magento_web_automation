/// <reference types="cypress" />

import TopNavBar from '../pages/topNavBar';
import SearchResultsPage from '../pages/SearchResultsPage';

describe('Search Results Page Tests', () => {

    const validSearchTerm = 'tee';
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

});
