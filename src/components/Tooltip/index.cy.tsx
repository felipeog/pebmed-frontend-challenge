import { Tooltip } from "components/Tooltip";

describe("<Tooltip />", () => {
  it("should render correctly", () => {
    cy.mount(
      <div>
        <p
          style={{ textAlign: "center" }}
          data-tooltip-id="tooltip"
          data-tooltip-content="Tooltip content"
        >
          Hover me
        </p>
        <Tooltip id="tooltip" />
      </div>
    );

    cy.contains("Hover me").should("be.visible");
    // https://github.com/cypress-io/cypress/issues/10
    // use click to trigger simulate mouseover event
    cy.contains("Hover me").click();
    cy.contains("Tooltip content").should("be.visible");
  });
});
