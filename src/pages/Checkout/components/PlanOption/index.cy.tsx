import { PlanOption } from "pages/Checkout/components/PlanOption";

describe("<PlanOption />", () => {
  const mockPlan = {
    title: "Title",
    description: "Description",
    fullPrice: 100,
    discountAmmount: 10,
    discountPercentage: 0.1,
    splittable: null, // override this
  };

  it("should render splittable version", () => {
    cy.mount(
      <PlanOption
        plan={{ ...mockPlan, splittable: true }}
        installmentsDescription="Selecione o número de parcelas"
        isSelected={false}
      />
    );

    cy.contains("Title | Description").should("be.visible");
    cy.get(".PlanOption > div > p:nth-of-type(2)")
      .should("be.visible")
      .should("have.text", "De R$ 100,00 | Por R$ 90,00 -10%");
    cy.contains("Selecione o número de parcelas").should("be.visible");
  });

  it("should render non-splittable version", () => {
    cy.mount(
      <PlanOption
        plan={{ ...mockPlan, splittable: false }}
        installmentsDescription="Selecione o número de parcelas"
        isSelected={false}
      />
    );

    cy.contains("Title | Description").should("be.visible");
    cy.get(".PlanOption > div > p:nth-of-type(2)")
      .should("be.visible")
      .should("have.text", "De R$ 100,00 | Por R$ 90,00 -10%");
    cy.contains("Selecione o número de parcelas").should("not.exist");
  });

  it("should trigger onClick", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <PlanOption
        plan={{ ...mockPlan, splittable: false }}
        installmentsDescription="Selecione o número de parcelas"
        isSelected={false}
        onClick={onClick}
      />
    );

    cy.get(".PlanOption").click();
    cy.get("@onClick").should("be.called");
  });
});
