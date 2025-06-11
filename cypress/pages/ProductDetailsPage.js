// ProductDetailsPage.js
import '../support/commands';

class ProductDetailsPage {
    // Product name link on results page
    getProductLink(productName) {
        return cy.contains('.product-item-link', productName);
    }

    get addToWishlistButton() {
        return cy.get('div.product-addto-links a.action.towishlist[data-action="add-to-wishlist"]');
    }

    selectSize(size) {
        cy.log(`Selecting size: ${size}`);
        cy.logStep(`Selected product size: ${size}`);
        cy.contains('.swatch-attribute.size .swatch-option', size).click();
    }

    selectColor(color) {
        cy.log(`Selecting color: ${color}`);
        cy.logStep(`Selected product color: ${color}`);
        cy.get('.swatch-attribute.color')
            .find(`.swatch-option.color[option-label="${color}"]`)
            .click();
    }

    get addToCartButton() {
        return cy.get('button[title="Add to Cart"]');
    }

    clickAddToCart() {
        cy.log('Clicking Add to Cart button');
        cy.logStep('Clicked Add to Cart button');
        this.addToCartButton.should('not.be.disabled').click();
    }

    confirmProductAdded(productName) {
        cy.log(`Confirming success message for adding ${productName} to cart`);
        cy.logStep(`Verified success message for ${productName} in cart`);
        cy.get('.message-success').should(
            'contain.text',
            `You added ${productName} to your shopping cart.`
        );
    }

    addProductToCart(product) {
        cy.log(`Starting add-to-cart flow for: ${product.productName}`);
        cy.logStep(`Initiating product search and add-to-cart for ${product.productName}`);
        cy.visit('/');

        cy.get('#search').clear().type(product.productName);
        cy.get('button[title="Search"]').click();

        this.getProductLink(product.productName).click();
        this.selectSize(product.size);
        this.selectColor(product.color);
        this.clickAddToCart();
        this.confirmProductAdded(product.productName);
    }

    addToWishlist(product) {

        
        cy.log(`Starting wishlist addition for: ${product.productName}`);
        cy.logStep(`Initiating product search and add-to-wishlist for ${product.productName}`);

        cy.get('#search', { timeout: 10000 }).clear().type(product.productName);
        cy.get('button[title="Search"]').click();

        this.getProductLink(product.productName).click();
        this.selectSize(product.size);
        this.selectColor(product.color);

        cy.log('Clicking Add to Wishlist button');
        cy.logStep(`Clicked Add to Wishlist for ${product.productName}`);
        this.addToWishlistButton.click();
    }
}

export default new ProductDetailsPage();
