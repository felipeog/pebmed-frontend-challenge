import { Checkbox } from "components/Checkbox";

describe("<Checkbox />", () => {
  it("should render correctly", () => {
    cy.mount(<Checkbox />);

    cy.get(".Checkbox").should("be.visible");
  });

  it("should trigger onClick", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(<Checkbox onClick={onClick} />);

    cy.get(".Checkbox").click();
    cy.get("@onClick").should("be.called");
  });

  it("should not trigger onClick when disabled", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(<Checkbox onClick={onClick} disabled />);

    cy.get(".Checkbox").should("be.disabled");
    cy.get(".Checkbox").click({ force: true });
    cy.get("@onClick").should("not.be.called");
  });
});
