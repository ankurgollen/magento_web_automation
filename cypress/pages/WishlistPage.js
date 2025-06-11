// WishlistPage.js
import '../support/commands';

class WishlistPage {

  get addToCartConfirmationMessage() {
    return cy.get('[data-bind*="prepareMessageForHtml"]', { timeout: 10000 });
  }

  visitWishlist() {
    cy.log('Visiting Wishlist page');
    cy.logStep('Navigated to the Wishlist page');
    cy.visit('/wishlist');
  }

  verifyWishlistTitle() {
    cy.log('Verifying Wishlist page title');
    cy.logStep('Checked Wishlist page title');
    cy.get('.base').should('contain.text', 'My Wish List');
  }

  verifyWishlistSuccessMessage(product) {
    cy.log(`Verifying success message for adding ${product.productName} to wishlist`);
    cy.logStep(`Confirmed success message for adding ${product.productName} to wishlist`);
    cy.get('.message-success', { timeout: 30000 })
      .should('be.visible')
      .and('contain.text', `${product.productName} has been added to your Wish List`);
  }

  verifyProductInWishlist(productName) {
    cy.log(`Verifying ${productName} is in the wishlist`);
    cy.logStep(`Checked that ${productName} is listed in the wishlist`);
    cy.contains('.product-item-name', productName).should('be.visible');
  }

  addToCartFromWishlist(productName) {
    cy.log(`Clicking Add All to Cart for ${productName}`);
    cy.logStep(`Clicked Add All to Cart button from wishlist for ${productName}`);
    cy.get('button[data-role="all-tocart"][title="Add All to Cart"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
  }

  verifyAddToCartSuccessMessage(productName) {
    cy.log(`Verifying Add to Cart success message for ${productName}`);
    cy.logStep(`Confirmed product ${productName} was added to cart from wishlist`);
    this.addToCartConfirmationMessage
      .should('be.visible')
      .and('contain.text', productName)
      .and('contain.text', 'have been added to shopping cart');
  }
}

export default new WishlistPage();
