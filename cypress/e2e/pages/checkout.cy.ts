/// <reference types="cypress" />

describe("checkout", () => {
  const baseUrl = "https://private-0ced4-pebmeddesafiofrontend.apiary-mock.com";
  const mockPlan = {
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
    splittable: null, // override this
    installments: null, // override this
    acceptsCoupon: false,
  };

  it("should render splittable form", () => {
    cy.intercept(`${baseUrl}/offer`, (req) => {
      req.reply([
        {
          ...mockPlan,
          splittable: true,
          installments: 3,
        },
      ]);
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
    cy.intercept(`${baseUrl}/offer`, (req) => {
      req.reply([
        {
          ...mockPlan,
          splittable: false,
          installments: 1,
        },
      ]);
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
