/// <reference types="cypress" />

describe("/checkout/success - success", () => {
  const mockSubscription = {
    fullPrice: 100,
    discountAmmount: 10,
    splittable: true,
    title: "Title",
    description: "Description",
    installments: 3,
    cpf: "123.123.123-12",
  };

  beforeEach(() => {
    cy.visit("/", {
      // https://github.com/cypress-io/cypress/discussions/19917
      onBeforeLoad(window) {
        window.history.pushState(
          {
            // to reflect on the react router state, the data must be put in the usr object
            usr: {
              subscription: mockSubscription,
            },
          },
          "Successful Checkout",
          "/checkout/success"
        );
      },
    });
  });

  it("should render text", () => {
    cy.contains("Parabéns!");
    cy.get("header p").should(
      "have.text",
      "Sua assinatura foi realizada com sucesso."
    );
    cy.contains(`${mockSubscription.title} | ${mockSubscription.description}`);
    cy.contains(mockSubscription.installments);
    cy.contains("usuario@email.com.br");
    cy.contains(mockSubscription.cpf);
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
