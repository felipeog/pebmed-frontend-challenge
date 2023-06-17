import { mount } from "cypress/react18";

import { ThemeProvider } from "theme/ThemeProvider";
import { Button } from "./index";

describe("<Button />", () => {
  it("renders", () => {
    mount(
      <ThemeProvider>
        <Button>Button</Button>
      </ThemeProvider>
    );
  });
});
