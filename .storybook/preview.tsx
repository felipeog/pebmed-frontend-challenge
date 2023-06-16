import React from "react";
import type { Preview } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "../src/ThemeProvider";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],
};

export default preview;
