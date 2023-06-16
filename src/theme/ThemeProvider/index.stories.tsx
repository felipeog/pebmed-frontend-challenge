import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "components/ThemeProvider";

const meta = {
  title: "Theme/ThemeProvider",
  component: ThemeProvider,
  tags: ["theme"],
  argTypes: {},
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {
  args: {
    children: (
      <div>
        <code>--color_primary</code>
        <p style={{ color: "var(--color_primary)" }}>&#11044;</p>
        <br />

        <code>--color_secondary</code>
        <p style={{ color: "var(--color_secondary)" }}>&#11044;</p>
        <br />

        <code>--color_white</code>
        <p
          style={{
            color: "var(--color_white)",
            backgroundColor: "var(--color_gray_2)",
          }}
        >
          &#11044;
        </p>
        <br />

        <code>--color_gray_1</code>
        <p style={{ color: "var(--color_gray_1)" }}>&#11044;</p>
        <br />

        <code>--color_gray_2</code>
        <p style={{ color: "var(--color_gray_2)" }}>&#11044;</p>
        <br />

        <code>--color_gray_3</code>
        <p style={{ color: "var(--color_gray_3)" }}>&#11044;</p>
        <br />

        <code>--color_gray_4</code>
        <p style={{ color: "var(--color_gray_4)" }}>&#11044;</p>
        <br />

        <code>--color_black</code>
        <p style={{ color: "var(--color_black)" }}>&#11044;</p>
      </div>
    ),
  },
};

export const Typography: Story = {
  args: {
    children: (
      <div>
        <code>--heading_1</code>
        <p style={{ font: "var(--heading_1)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--heading_2</code>
        <p style={{ font: "var(--heading_2)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--heading_3</code>
        <p style={{ font: "var(--heading_3)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--heading_4</code>
        <p style={{ font: "var(--heading_4)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--heading_5</code>
        <p style={{ font: "var(--heading_5)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--heading_6</code>
        <p style={{ font: "var(--heading_6)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--text_regular</code>
        <p style={{ font: "var(--text_regular)" }}>
          Lorem ipsum dolor sit amet
        </p>
        <br />

        <code>--text_small</code>
        <p style={{ font: "var(--text_small)" }}>Lorem ipsum dolor sit amet</p>
        <br />

        <code>--text_small_bold</code>
        <p style={{ font: "var(--text_small_bold)" }}>
          Lorem ipsum dolor sit amet
        </p>
        <br />

        <code>--text_footnote</code>
        <p style={{ font: "var(--text_footnote)" }}>
          Lorem ipsum dolor sit amet
        </p>
        <br />

        <code>--text_exception</code>
        <p style={{ font: "var(--text_exception)" }}>
          Lorem ipsum dolor sit amet
        </p>
      </div>
    ),
  },
};
