/// <reference types="cypress" />

const BASE_URL = "https://private-0ced4-pebmeddesafiofrontend.apiary-mock.com";

describe("/checkout - success", () => {
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
    cy.intercept(`${BASE_URL}/offer`, (req) => {
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
    cy.intercept(`${BASE_URL}/offer`, (req) => {
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

describe("/checkout - error", () => {
  it("should render plans error", () => {
    cy.intercept(`${BASE_URL}/offer`, (req) => {
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

    cy.intercept(`${BASE_URL}/subscription`, (req) => {
      req.reply({
        statusCode: 500,
      });
    });
    cy.visit("/checkout");

    cy.get('input[name="number"]').type(checkout.number);
    cy.get('input[name="expiration"]').type(checkout.expiration);
    cy.get('input[name="code"]').type(checkout.code);
    cy.get('input[name="name"]').type(checkout.name);
    cy.get('input[name="cpf"]').type(checkout.cpf);
    cy.get('input[name="coupon"]').type(checkout.coupon);
    cy.get('select[name="installments"]').select(checkout.installments);
    cy.contains(checkout.plan).click();
    cy.contains("Finalizar pagamento").click();
    cy.contains(
      "Ocorreu um erro. Atualize a página ou tente novamente mais tarde."
    ).should("be.visible");
  });
});
