import { Icon } from "components/Icon";

describe("<Icon />", () => {
  it("should render correctly", () => {
    cy.mount(<Icon name="ArrowLeft" />);

    cy.get(".Icon").should("be.visible");
  });

  it("should not render when name is not provided", () => {
    // disabling eslint and typescript to test the component
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.mount(<Icon />);

    cy.get(".Icon").should("not.exist");
  });
});
