/// <reference types="cypress" />

import TopNavBar from '../pages/topNavBar';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import WishlistPage from '../pages/WishlistPage';
import ReviewAndPaymentsPage from '../pages/ReviewAndPaymentsPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import ShippingAddressPage from '../pages/ShippingAddressPage';
import SearchResultsPage from '../pages/SearchResultsPage';

describe('Wishlist to Order flow', () => {
    beforeEach(() => {
        cy.fixture('orderData').as('products');
    });

    it('should add product to wishlist and complete order from wishlist', function () {
        const product = this.products[0]; // First product from fixture

        cy.login(); // Assumes custom command
        cy.visit('/');
        TopNavBar.searchFor(product.productName);
        SearchResultsPage.clickProductByName(product.productName);

        ProductDetailsPage.addToWishlist(product);

        WishlistPage.verifyWishlistTitle();
        WishlistPage.verifyWishlistSuccessMessage(product);
        WishlistPage.verifyProductInWishlist(product.productName);

        // Add to cart from wishlist
        WishlistPage.addToCartFromWishlist(product.productName);
        WishlistPage.verifyAddToCartSuccessMessage(product.productName);

        // Proceed to checkout
        TopNavBar.assertCartBadgeVisible();
        TopNavBar.assertCartBadgeCount(1);
        TopNavBar.clickProceedToCheckout();


        ShippingAddressPage.verifyAddressPresent();
        ShippingAddressPage.existingAddressBlock.should('be.visible');
        ShippingAddressPage.selectTableRate();
        ShippingAddressPage.nextButton.should('be.visible').click();

        ReviewAndPaymentsPage.confirmReviewAndPaymentStepSelected();
        ReviewAndPaymentsPage.clickPlaceOrder();

        // Confirm order placed successfully
        OrderConfirmationPage.verifyOrderNumberIsVisible();
        OrderConfirmationPage.verifyThankYouMessage();
        OrderConfirmationPage.orderNumber.invoke('text').then((orderNumber) => {
            cy.log(`Your order number is: ${orderNumber}`);
        });
    });
});
