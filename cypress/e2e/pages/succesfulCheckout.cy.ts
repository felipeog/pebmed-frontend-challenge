/// <reference types="cypress" />

import subscriptionSplittable from "../../fixtures/subscriptionSplittable.json";
import subscriptionNonSplittable from "../../fixtures/subscriptionNonSplittable.json";

describe("/checkout/success - success", () => {
  it("should render splittable subscription", () => {
    cy.visit("/", {
      // https://github.com/cypress-io/cypress/discussions/19917
      onBeforeLoad(window) {
        window.history.pushState(
          {
            // to reflect on the react router state, the data must be put in the usr object
            usr: {
              subscription: subscriptionSplittable,
            },
          },
          "Successful Checkout",
          "/checkout/success"
        );
      },
    });

    cy.contains("Parabéns!");
    cy.get("header p").should(
      "have.text",
      "Sua assinatura foi realizada com sucesso."
    );
    cy.contains("Title | Description");
    cy.contains("R$ 90,00 | 3x R$ 30,00");
    cy.contains("usuario@email.com.br");
    cy.contains("123.123.123-12");
    cy.contains("Gerenciar assinatura");
    cy.contains("Ir para a Home");
  });

  it("should render non-splittable subscription", () => {
    cy.visit("/", {
      // https://github.com/cypress-io/cypress/discussions/19917
      onBeforeLoad(window) {
        window.history.pushState(
          {
            // to reflect on the react router state, the data must be put in the usr object
            usr: {
              subscription: subscriptionNonSplittable,
            },
          },
          "Successful Checkout",
          "/checkout/success"
        );
      },
    });

    cy.contains("Parabéns!");
    cy.get("header p").should(
      "have.text",
      "Sua assinatura foi realizada com sucesso."
    );
    cy.contains("Title | Description");
    cy.contains("R$ 90,00");
    cy.contains("usuario@email.com.br");
    cy.contains("123.123.123-12");
    cy.contains("Gerenciar assinatura");
    cy.contains("Ir para a Home");
  });

  it("should redirect to home (Gerenciar assinatura)", () => {
    cy.contains("Gerenciar assinatura").click();
    cy.location("pathname").should("eq", "/");
  });

  it("should redirect to home (Ir para a Home)", () => {
    cy.contains("Ir para a Home").click();
    cy.location("pathname").should("eq", "/");
  });
});

describe("/checkout/success - error", () => {
  it("should redirect to home when subscription state is not present", () => {
    cy.visit("/checkout/success");
    cy.location("pathname").should("eq", "/");
  });
});
