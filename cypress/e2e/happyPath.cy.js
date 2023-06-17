/// <reference types="cypress" />

const form = {
  number: "1234123412341234",
  expiration: "1212",
  code: "123",
  name: "usuario",
  cpf: "12312312312",
  coupon: "1234",
  installments: "12",
  plan: "Premium Anual | Parcelado",
};
const subscription = {
  email: "usuario@email.com.br",
  installments: "R$ 540,00 | 12x R$ 45,00",
  cpf: "123.123.123-12",
};

describe("happy path", () => {
  before(() => {
    cy.visit("/");
  });

  it("should complete happy path", () => {
    // Home
    cy.contains("Whitebook").should("be.visible");
    cy.contains("Assinar o Whitebook").click();

    // Checkout
    cy.get('input[name="number"]').type(form.number);
    cy.get('input[name="expiration"]').type(form.expiration);
    cy.get('input[name="code"]').type(form.code);
    cy.get('input[name="name"]').type(form.name);
    cy.get('input[name="cpf"]').type(form.cpf);
    cy.get('input[name="coupon"]').type(form.coupon);
    cy.get('select[name="installments"]').select(form.installments);
    cy.contains(form.plan).click();
    cy.contains("Finalizar pagamento").click();

    // Successful Checkout
    cy.contains("Parabéns!").should("be.visible");
    cy.contains(form.plan).should("be.visible");
    cy.contains(subscription.installments).should("be.visible");
    cy.contains(subscription.email).should("be.visible");
    cy.contains(subscription.cpf).should("be.visible");
    cy.contains("Ir para a Home").click();

    // Home
    cy.contains("Whitebook").should("be.visible");
  });
});
