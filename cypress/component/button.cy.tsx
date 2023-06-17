import React from "react";

import { Button } from "../../src/components/Button/";

describe("<Button />", () => {
  it("should render correctly", () => {
    cy.mount(<Button>Button</Button>);

    cy.get(".Button").should("be.visible");
  });
});
