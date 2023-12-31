import { Button } from "components/Button";

describe("<Button />", () => {
  it("should render correctly", () => {
    cy.mount(<Button>Button</Button>);

    cy.get(".Button").should("be.visible");
    cy.get(".Button").should("have.text", "Button");
  });

  it("should trigger onClick", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(<Button onClick={onClick}>Button</Button>);

    cy.get(".Button").click();
    cy.get("@onClick").should("be.called");
  });

  it("should be disabled", () => {
    cy.mount(<Button disabled>Button</Button>);

    cy.get(".Button").should("have.attr", "disabled");
  });
});
