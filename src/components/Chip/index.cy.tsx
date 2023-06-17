import { Chip } from "components/Chip";

describe("<Chip />", () => {
  it("should render correctly", () => {
    cy.mount(<Chip>Chip</Chip>);

    cy.get(".Chip").should("be.visible");
    cy.get(".Chip").should("have.text", "Chip");
  });
});
