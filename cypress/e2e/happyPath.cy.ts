/// <reference types="cypress" />

import checkoutInput from "../fixtures/checkoutInput.json";
import checkoutSuccess from "../fixtures/checkoutSuccess.json";

describe("happy path", () => {
  before(() => {
    cy.visit("/");
  });

  it("should complete happy path", () => {
    // Home
    cy.contains("Whitebook").should("be.visible");
    cy.contains("Assinar o Whitebook").click();

    // Checkout
    cy.get('input[name="number"]').type(checkoutInput.number);
    cy.get('input[name="expiration"]').type(checkoutInput.expiration);
    cy.get('input[name="code"]').type(checkoutInput.code);
    cy.get('input[name="name"]').type(checkoutInput.name);
    cy.get('input[name="cpf"]').type(checkoutInput.cpf);
    cy.get('input[name="coupon"]').type(checkoutInput.coupon);
    cy.get('select[name="installments"]').select(checkoutInput.installments);
    cy.contains(checkoutInput.plan).click();
    cy.contains("Finalizar pagamento").click();

    // Successful Checkout
    cy.contains("Parabéns!").should("be.visible");
    cy.contains(checkoutSuccess.plan).should("be.visible");
    cy.contains(checkoutSuccess.installments).should("be.visible");
    cy.contains(checkoutSuccess.email).should("be.visible");
    cy.contains(checkoutSuccess.cpf).should("be.visible");
    cy.contains("Ir para a Home").click();

    // Home
    cy.contains("Whitebook").should("be.visible");
  });
});
