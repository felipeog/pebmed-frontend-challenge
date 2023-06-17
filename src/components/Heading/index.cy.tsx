import { Heading } from "components/Heading";

describe("<Heading />", () => {
  it("should render correctly", () => {
    cy.mount(<Heading>Heading</Heading>);

    cy.get(".Heading").should("be.visible");
    cy.get(".Heading").should("have.text", "Heading");
  });

  it("should render the correct tag", () => {
    cy.mount(<Heading tag="h4">Heading</Heading>);

    cy.get("h4.Heading").should("exist");
  });
});
