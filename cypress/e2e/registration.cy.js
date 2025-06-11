import TopNavBar from '../pages/topNavBar';
import CreateAccountPage from '../pages/CreateAccountPage';
import MyAccountPage from '../pages/MyAccountPage';
import CustomerLogin from '../pages/CustomerLogin';

describe('Register Tests', () => {
  const user = {
    firstName: 'Test', lastName: 'User',
    email: `testuser+${Date.now()}@example.com`,
    password: 'Password123!'
  };

  it('should create an account', () => {
    cy.visit('/');
    // Navigate to Create Account page
    TopNavBar.goToCreateAccount();

    // Fill out the registration form
    CreateAccountPage.fillForm(user);
    CreateAccountPage.submit();

    // Verify account creation
    MyAccountPage.verifyAccountCreationSuccess(user);

  });

  it('should login with created account', () => {
    CustomerLogin.visitLoginPage();

    CustomerLogin.fillForm({
      email: user.email,
      password: user.password
    });
    CustomerLogin.submitForm();
    MyAccountPage.pageTitle.should('contain', 'My Account');
    MyAccountPage.contactInfo.should('contain', user.email);
  });
});