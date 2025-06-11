import '../support/commands';

class TopNavBar {
  get createAccountLink() {
    return cy.get('ul.header.links li a').contains('Create an Account');
  }

  get signInLink() {
    return cy.get('#header').children('a').contains('Sign In');
  }

  get whatsNewMenu() {
    return cy.get(`a:contains("What's New")`);
  }

  get menMenu() {
    return cy.get('a:contains("Men")');
  }

  get searchInput() {
    return cy.get('#search');
  }

  get searchButton() {
    return cy.get('button[title="Search"]').should('be.enabled');
  }

  get cartIcon() {
    return cy.get('a.showcart');
  }

  get cartItemsList() {
    return cy.get('.minicart-items .product-item').should('be.visible');
  }

  get emptyCartMessage() {
    return cy.get('.minicart-items .subtitle').contains('You have no items in your shopping cart.');
  }

  get proceedToCheckoutButton() {
    return cy.get('#top-cart-btn-checkout');
  }

  get cartCounterBadge() {
    return cy.get('.counter-number');
  }

  assertCartBadgeVisible() {
    cy.log('Asserting cart badge is visible');
    cy.logStep('Verified that the cart badge is visible');
    this.cartCounterBadge.should('be.visible');
  }

  assertCartBadgeCount(expectedCount) {
    cy.log(`Asserting cart badge count is ${expectedCount}`);
    cy.logStep(`Verified cart badge displays count: ${expectedCount}`);
    this.cartCounterBadge.should('contain.text', expectedCount);
  }

  clickProceedToCheckout() {
    cy.log('Clicking Proceed to Checkout');
    cy.logStep('Attempting to click Proceed to Checkout button');
    this.openCart();
    this.cartItemsList.should('have.length.at.least', 1);
    this.proceedToCheckoutButton.should('be.visible').click();
  }

  goToCreateAccount() {
    cy.log('Navigating to Create Account page');
    cy.logStep('Clicked on Create Account link');
    this.createAccountLink.click();
  }

  goToSignIn() {
    cy.log('Navigating to Sign In page');
    cy.logStep('Clicked on Sign In link');
    this.signInLink.click();
  }

  navigateToWhatsNew() {
    cy.log('Navigating to What\'s New page');
    cy.logStep('Clicked on What\'s New menu item');
    this.whatsNewMenu.click();
  }

  navigateToMensJackets() {
    cy.log('Navigating to Men > Jackets');
    cy.logStep('Hovered over Men menu and clicked Jackets');
    this.menMenu.trigger('mouseover');
    cy.get('a:contains("Jackets"):visible').click();
  }

  searchFor(term) {
    cy.log(`Searching for term: ${term}`);
    cy.logStep(`Searched for product: ${term}`);
    this.searchInput.clear().type(term);
    this.searchButton.click();
  }

  openCart() {
    cy.log('Opening cart');
    cy.logStep('Clicked on cart icon to open mini cart');
    this.cartIcon.should('be.visible').click();
  }

  verifyCartIsEmpty() {
    cy.log('Verifying cart is empty');
    cy.logStep('Checked that cart displays empty message');
    this.openCart();
    this.emptyCartMessage.should('be.visible');
  }

  verifyCartHasItems(count) {
    cy.log(`Verifying cart has at least ${count} item(s)`);
    cy.logStep(`Checked that cart has at least ${count} product(s)`);
    this.openCart();
    this.cartItemsList.should('have.length.at.least', count);
  }
}

export default new TopNavBar();
