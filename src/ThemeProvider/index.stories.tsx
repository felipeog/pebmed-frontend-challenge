import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "./";

const meta = {
  title: "ThemeProvider",
  component: ThemeProvider,
  tags: ["theme"],
  argTypes: {},
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {
  args: {
    children: (
      <div style={{ display: "grid", gap: "1rem" }}>
        <p style={{ color: "var(--color_primary)" }}>
          --color_primary - &#11044;
        </p>
        <p style={{ color: "var(--color_secondary)" }}>
          --color_secondary - &#11044;
        </p>
        <p
          style={{
            color: "var(--color_white)",
            backgroundColor: "var(--color_gray_2)",
          }}
        >
          --color_white - &#11044;
        </p>
        <p style={{ color: "var(--color_gray_1)" }}>
          --color_gray_1 - &#11044;
        </p>
        <p style={{ color: "var(--color_gray_2)" }}>
          --color_gray_2 - &#11044;
        </p>
        <p style={{ color: "var(--color_gray_3)" }}>
          --color_gray_3 - &#11044;
        </p>
        <p style={{ color: "var(--color_gray_4)" }}>
          --color_gray_4 - &#11044;
        </p>
        <p style={{ color: "var(--color_black)" }}>--color_black - &#11044;</p>
      </div>
    ),
  },
};

export const Typography: Story = {
  args: {
    children: (
      <div style={{ display: "grid", gap: "1rem" }}>
        <p style={{ font: "var(--heading_4)" }}>
          --heading_4 - Lorem ipsum dolor sit amet
        </p>
        <p style={{ font: "var(--text_regular)" }}>
          --text_regular - Lorem ipsum dolor sit amet
        </p>
        <p style={{ font: "var(--text_small)" }}>
          --text_small - Lorem ipsum dolor sit amet
        </p>
        <p style={{ font: "var(--text_small_bold)" }}>
          --text_small_bold - Lorem ipsum dolor sit amet
        </p>
        <p style={{ font: "var(--text_footnote)" }}>
          --text_footnote - Lorem ipsum dolor sit amet
        </p>
        <p style={{ font: "var(--text_exception)" }}>
          --text_exception - Lorem ipsum dolor sit amet
        </p>
      </div>
    ),
  },
};
