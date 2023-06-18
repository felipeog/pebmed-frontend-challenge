/// <reference types="cypress" />

describe("successful checkout", () => {
  const mockSubscription = {
    plan: {
      id: 0,
      storeId: "id",
      title: "Title",
      description: "Description",
      caption: "Caption",
      fullPrice: 100,
      discountAmmount: 10,
      discountPercentage: 0.1,
      periodLabel: "Period Label",
      period: "Period",
      discountCouponCode: null,
      order: 0,
      priority: 0,
      gateway: "Gateway",
      splittable: true,
      installments: 3,
      acceptsCoupon: true,
    },
    installment: {
      label: "R$ 90,00 | 3x R$ 30,00",
      value: 3,
    },
    form: {
      number: "1234 1234 1234 1234",
      expiration: "12/12",
      code: "123",
      name: "USUARIO",
      cpf: "123.123.123-12",
      coupon: "1234",
      installments: "3",
    },
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
    cy.contains(
      `${mockSubscription.plan.title} | ${mockSubscription.plan.description}`
    );
    cy.contains(mockSubscription.installment.label);
    cy.contains("usuario@email.com.br");
    cy.contains(mockSubscription.form.cpf);
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
