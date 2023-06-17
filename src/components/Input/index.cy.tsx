import { Input } from "components/Input";

describe("<Input />", () => {
  it("should render correctly", () => {
    cy.mount(<Input placeholder="Input" label="Label" />);

    cy.get(".Input label").should("be.visible");
    cy.get(".Input label").should("have.text", "Label");
    cy.get(".Input input").should("have.attr", "placeholder", "Input");
  });

  it("should accept input", () => {
    cy.mount(<Input />);

    cy.get(".Input input").type("Lorem ipsum");
    cy.get(".Input input").should("have.value", "Lorem ipsum");
  });

  it("should be disabled", () => {
    cy.mount(<Input disabled />);

    cy.get(".Input input").should("have.attr", "disabled");
  });

  it("should be focused on label click", () => {
    cy.mount(<Input label="Label" id="id" />);

    cy.get(".Input input").should("not.be.focused");
    cy.get(".Input label").click();
    cy.get(".Input input").should("be.focused");
  });
});
