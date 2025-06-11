import CustomerLoginPage from '../pages/CustomerLogin';
import MyAccountPage from '../pages/MyAccountPage';
import addContext from 'mochawesome/addContext';

Cypress.Commands.add('logStep', (message) => {
  cy.once('test:after:run', (test, runnable) => {
    addContext({ test }, message);
  });
});

Cypress.Commands.add('login', () => {
  cy.session('user-session', () => {

    const username = Cypress.env('username');
    const password = Cypress.env('password');
    if (!username || !password) {
      throw new Error('Username or password is not set in environment variables');
    }

    CustomerLoginPage.visitLoginPage();
    CustomerLoginPage.fillForm({
      email: username,
      password: password
    });
    CustomerLoginPage.submitForm();
    MyAccountPage.pageTitle.should('contain', 'My Account');
    MyAccountPage.contactInfo.should('contain', username);
  });
});

