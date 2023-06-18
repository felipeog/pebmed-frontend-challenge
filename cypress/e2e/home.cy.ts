/// <reference types="cypress" />

describe("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render text", () => {
    cy.contains("Whitebook").should("be.visible");
    cy.contains(
      "De médicos para médicos, melhorando a sua tomada de decisão clínica"
    ).should("be.visible");
    cy.contains("Assinar o Whitebook").should("be.visible");
  });

  it("should redirect to checkout", () => {
    cy.contains("Assinar o Whitebook").click();
    cy.location("pathname").should("eq", "/checkout");
  });
});
