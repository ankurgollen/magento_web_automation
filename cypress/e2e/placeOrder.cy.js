import ShippingAddressPage from '../pages/ShippingAddressPage';
import TopNavBar from '../pages/topNavBar';
import { loadOrderData } from '../utils/dataUtils';
import ReviewAndPaymentsPage from '../pages/ReviewAndPaymentsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';


describe('Place Order with Multiple Products', () => {
    before(() => {
        cy.login();
    });

    it('should add multiple products to cart using fixture data', () => {
        loadOrderData().then((products) => {
            products.forEach(product => {
                cy.visit('/');
                ProductDetailsPage.addProductToCart(product);
            });

            // Open mini cart and proceed to checkout
            TopNavBar.assertCartBadgeVisible();
            TopNavBar.assertCartBadgeCount(products.length);
            TopNavBar.clickProceedToCheckout();

            // ShippingAddressPage.pageTitle.should('contain', 'Shipping Address');
            ShippingAddressPage.verifyAddressPresent();
            ShippingAddressPage.selectTableRate();
            ShippingAddressPage.clickNext();

            // ReviewAndPaymentsPage.confirmPageTitle('Review & Payments');
            ReviewAndPaymentsPage.confirmReviewAndPaymentStepSelected();
            ReviewAndPaymentsPage.confirmOrderItems(products.map(p => p.productName));
            ReviewAndPaymentsPage.verifyTotalAmountMatchesSum();
            ReviewAndPaymentsPage.clickPlaceOrder();

            // Confirm order placed successfully
            OrderConfirmationPage.verifyOrderNumberIsVisible();
            OrderConfirmationPage.verifyThankYouMessage();
        });
    });
});