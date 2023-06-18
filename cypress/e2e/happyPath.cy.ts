/// <reference types="cypress" />

describe("happy path", () => {
  const checkout = {
    number: "1234123412341234",
    expiration: "1212",
    code: "123",
    name: "usuario",
    cpf: "12312312312",
    coupon: "1234",
    installments: "12",
    plan: "Premium Anual | Parcelado",
  };
  const successfulCheckout = {
    plan: "Premium Anual | Parcelado",
    email: "usuario@email.com.br",
    installments: "R$ 540,00 | 12x R$ 45,00",
    cpf: "123.123.123-12",
  };

  before(() => {
    cy.visit("/");
  });

  it("should complete happy path", () => {
    // Home
    cy.contains("Whitebook").should("be.visible");
    cy.contains("Assinar o Whitebook").click();

    // Checkout
    cy.get('input[name="number"]').type(checkout.number);
    cy.get('input[name="expiration"]').type(checkout.expiration);
    cy.get('input[name="code"]').type(checkout.code);
    cy.get('input[name="name"]').type(checkout.name);
    cy.get('input[name="cpf"]').type(checkout.cpf);
    cy.get('input[name="coupon"]').type(checkout.coupon);
    cy.get('select[name="installments"]').select(checkout.installments);
    cy.contains(checkout.plan).click();
    cy.contains("Finalizar pagamento").click();

    // Successful Checkout
    cy.contains("Parabéns!").should("be.visible");
    cy.contains(successfulCheckout.plan).should("be.visible");
    cy.contains(successfulCheckout.installments).should("be.visible");
    cy.contains(successfulCheckout.email).should("be.visible");
    cy.contains(successfulCheckout.cpf).should("be.visible");
    cy.contains("Ir para a Home").click();

    // Home
    cy.contains("Whitebook").should("be.visible");
  });
});
