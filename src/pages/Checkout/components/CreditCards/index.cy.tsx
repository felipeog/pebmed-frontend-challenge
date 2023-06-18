import { CreditCards } from "pages/Checkout/components/CreditCards";

describe("<CreditCards />", () => {
  it("should render correctly", () => {
    cy.mount(<CreditCards />);

    cy.get("img").should("be.visible");
    cy.contains("Pagamentos por").should("be.visible");
    cy.get(".Icon.Iugu").should("be.visible");
  });
});
