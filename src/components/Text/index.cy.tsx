import { Text } from "components/Text";

describe("<Text />", () => {
  it("should render correctly", () => {
    cy.mount(<Text>Text</Text>);

    cy.get(".Text").should("be.visible");
    cy.get(".Text").should("have.text", "Text");
  });
});
