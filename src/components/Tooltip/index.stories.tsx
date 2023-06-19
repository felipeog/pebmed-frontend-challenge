import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "components/Tooltip";

const meta = {
  title: "Component/Tooltip",
  component: Tooltip,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    id: "tooltip",
    content: "Tooltip content",
  },
  render: (props) => (
    <div>
      <p
        style={{ textAlign: "center" }}
        data-tooltip-id={props.id}
        data-tooltip-content={props.content}
      >
        Hover me
      </p>
      <Tooltip id={props.id} />
    </div>
  ),
};
