/// <reference types="cypress" />

import { baseUrl as API_BASE_URL } from "../../../src/services/api";
import checkoutInput from "../../fixtures/checkoutInput.json";
import planSplittable from "../../fixtures/planSplittable.json";
import planNonSplittable from "../../fixtures/planNonSplittable.json";

describe("/checkout - success", () => {
  it("should render splittable form", () => {
    cy.intercept(`${API_BASE_URL}/offer`, (req) => {
      req.reply([planSplittable]);
    });
    cy.visit("/checkout");

    cy.contains("Selecione o número de parcelas").should("be.visible");
    cy.get('input[name="number"]').should("be.visible");
    cy.get('input[name="expiration"]').should("be.visible");
    cy.get('input[name="code"]').should("be.visible");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="cpf"]').should("be.visible");
    cy.get('input[name="coupon"]').should("be.visible");
    cy.get('select[name="installments"]').should("be.visible");
    cy.get('select[name="installments"] option').should("have.length", 3); // 1 empty + 2 installments
  });

  it("should render non-splittable form", () => {
    cy.intercept(`${API_BASE_URL}/offer`, (req) => {
      req.reply([planNonSplittable]);
    });
    cy.visit("/checkout");

    cy.contains("Selecione o número de parcelas").should("not.exist");
    cy.get('input[name="number"]').should("be.visible");
    cy.get('input[name="expiration"]').should("be.visible");
    cy.get('input[name="code"]').should("be.visible");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="cpf"]').should("be.visible");
    cy.get('input[name="coupon"]').should("be.visible");
    cy.get('select[name="installments"]').should("not.exist");
  });
});

describe("/checkout - error", () => {
  it("should render plans error", () => {
    cy.intercept(`${API_BASE_URL}/offer`, (req) => {
      req.reply({
        statusCode: 500,
      });
    });
    cy.visit("/checkout");

    cy.contains(
      "Ocorreu um erro. Atualize a página ou tente novamente mais tarde.",
      { timeout: 30 * 1_000 } // increase timeout as react query will retry a few times
    ).should("be.visible");
  });

  it("should render subscription error", () => {
    cy.intercept(`${API_BASE_URL}/subscription`, (req) => {
      req.reply({
        statusCode: 500,
      });
    });
    cy.visit("/checkout");

    cy.get('input[name="number"]').type(checkoutInput.number);
    cy.get('input[name="expiration"]').type(checkoutInput.expiration);
    cy.get('input[name="code"]').type(checkoutInput.code);
    cy.get('input[name="name"]').type(checkoutInput.name);
    cy.get('input[name="cpf"]').type(checkoutInput.cpf);
    cy.get('input[name="coupon"]').type(checkoutInput.coupon);
    cy.get('select[name="installments"]').select(checkoutInput.installments);
    cy.contains(checkoutInput.plan).click();
    cy.contains("Finalizar pagamento").click();
    cy.contains(
      "Ocorreu um erro. Atualize a página ou tente novamente mais tarde."
    ).should("be.visible");
  });
});
