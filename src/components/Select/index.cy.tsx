import { Select } from "components/Select";

const options = [
  { value: "Lorem", label: "Lorem" },
  { value: "Ipsum", label: "Ipsum" },
  { value: "Dolor", label: "Dolor" },
  { value: "Sit", label: "Sit" },
  { value: "Amet", label: "Amet" },
];

describe("<Select />", () => {
  it("should render correctly", () => {
    cy.mount(<Select label="Label" options={options} />);

    cy.get(".Select label").should("be.visible");
    cy.get(".Select label").should("have.text", "Label");
  });

  it("should accept selection", () => {
    cy.mount(<Select options={options} />);

    cy.get(".Select select").should("have.value", null);
    cy.get(".Select select").select("Lorem");
    cy.get(".Select select").should("have.value", "Lorem");
  });

  it("should be disabled", () => {
    cy.mount(<Select options={options} disabled />);

    cy.get(".Select Select").should("be.disabled");
  });

  it("should be focused on label click", () => {
    cy.mount(<Select options={options} label="Label" id="id" />);

    cy.get(".Select select").should("not.be.focused");
    cy.get(".Select label").click();
    cy.get(".Select select").should("be.focused");
  });
});
