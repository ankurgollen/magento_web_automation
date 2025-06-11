# Magento E2E Test Automation Framework (Cypress)

This project is a Cypress-based end-to-end automation test framework for the [Magento Demo Store](https://magento.softwaretestingboard.com/), built using the **Page Object Model (POM)** design pattern and includes external test data, robust reporting, and secure credential handling.

---

## ✅ Features & Requirements Met

* ✔ **Page Object Model** used to encapsulate UI actions and locators.
* ✔ **Reporting integrated** using `cypress-mochawesome-reporter`.
* ✔ **Test data from external files** using `fixtures/*.json`.
* ✔ Fully **executable test suite** with environment-based login.
* ✔ **Personal credentials** are stored via environment variables.
* ✔ **README.md** explains how to run and configure the project.

---

## 📁 Project Structure Overview

```
magento_web_automation/
├── cypress/
│   ├── e2e/                  # Test specs
│   ├── fixtures/             # JSON test data
│   ├── pages/                # Page Object classes
│   ├── reports/              # Mochawesome reports
│   └── support/              # Commands & common methods
├── cypress.config.js         # Cypress configuration
├── .env                      # Environment variables file
├── package.json              # Project scripts & dependencies
├── README.md                 # Project documentation
```

---

## 🔧 Setup Instructions

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. 🔐 Create `.env` file

Create a `.env` file at the root level with the following keys:

```env
CYPRESS_username=testaccount001@email.com
CYPRESS_password=Password123
```

**Note:** Do not commit `.env` to version control.

### 3. 📄 Test data

Test data is maintained in:

* `cypress/fixtures/orderData.json` for product info

---

## Running the Tests

### Run all tests:

```bash
npx cypress run --env username=testaccount002@email.com password=Password123
```

This will:

\* Run all specs

\* Merge reports

\* Generate a single HTML report in \`cypress/reports/mochawesome/index.html\`

\* Reports are named in a sequesntial way with (index.html, index\_001.html....). Please check the generated report for the specific test run at near the bottom of your terminal output.

### Run a single spec:

```bash
npx cypress run --spec "cypress/e2e/registration.cy.js"
```

### Open Cypress GUI:

```bash
npx cypress open
```

---

## 📊 Reporting

This framework uses `cypress-mochawesome-reporter`. Reports are generated automatically under:

```
cypress/reports/mochawesome/index_001.html
```

To view the report:

```bash
open cypress/reports/mochawesome/index_001.html
```

---

## 🔒 Security

* No credentials or API keys are committed.
* Environment variables are loaded via `.env` using the `dotenv` package.
