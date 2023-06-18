import { mount } from "cypress/react18";

import { ThemeProvider } from "theme/ThemeProvider";
import "./commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  return mount(<ThemeProvider>{component}</ThemeProvider>, options);
});
