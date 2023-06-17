import { Button } from "components/Button";

describe("<Button />", () => {
  it("should render correctly", () => {
    cy.mount(<Button>Button</Button>);

    cy.get(".Button").should("be.visible").should("have.text", "Button");
  });

  it("should trigger onClick", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(<Button onClick={onClick}>Button</Button>);

    cy.get(".Button").click();
    cy.get("@onClick").should("be.called");
  });

  it("should not trigger onClick when disabled", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <Button onClick={onClick} disabled>
        Button
      </Button>
    );

    cy.get(".Button").should("be.disabled");
    cy.get(".Button").click({ force: true });
    cy.get("@onClick").should("not.be.called");
  });
});
