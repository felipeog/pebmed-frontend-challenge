import { Card } from "components/Card";

describe("<Card />", () => {
  it("should render correctly", () => {
    cy.mount(<Card>Card</Card>);

    cy.get(".Card").should("be.visible");
    cy.get(".Card").should("have.text", "Card");
  });
});
